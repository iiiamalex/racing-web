import React, { useEffect, useRef, useState } from 'react';

const ContactPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '', honeypot: '' });
    const [status, setStatus] = useState(null);
    const [error, setError] = useState('');

    const videoRef = useRef(null);

    // Seamless background video loop
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleLoop = () => {
            if (video.duration - video.currentTime < 0.3) {
                video.currentTime = 0;
                video.play();
            }
        };

        video.addEventListener('timeupdate', handleLoop);
        return () => video.removeEventListener('timeupdate', handleLoop);
    }, []);

    // Auto-clear error message
    useEffect(() => {
        if (status === 'error') {
            const timeout = setTimeout(() => setError(''), 5000);
            return () => clearTimeout(timeout);
        }
    }, [status]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        setError('');

        // 🛡️ Spam bot check
        if (formData.honeypot) return;

        const payload = {
            to: 'aaguilera.se66@gmail.com',
            subject: `New message from ${formData.name} (${formData.email})`,
            html: `
                <p><strong>Sender:</strong> ${formData.name}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                <p><strong>Message:</strong></p>
                <blockquote>${formData.message}</blockquote>
            `
        };

        try {
            const res = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setStatus('sent');
                setFormData({ name: '', email: '', message: '', honeypot: '' });
            } else {
                throw new Error(data.error || 'Failed to send email');
            }
        } catch (err) {
            setError(err.message || 'Unexpected error');
            setStatus('error');
        }
    };

    return (
        <div className="contact-video-wrapper">
            <video
                ref={videoRef}
                className="video-background"
                autoPlay
                muted
                playsInline
                src="https://pub-11fe6e6621de4f139652de06caab7aa8.r2.dev/contactBG.mp4"
                type="video/mp4"
            />
            <div className="contact-overlay">
                <div className="contact-page">
                    <h2 className="contact-title">Get in Touch</h2>
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <input
                            name="name"
                            type="text"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            name="email"
                            type="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                        {/* 🕳️ Honeypot field for spam bots */}
                        <input
                            type="text"
                            name="honeypot"
                            value={formData.honeypot}
                            onChange={handleChange}
                            style={{ display: 'none' }}
                            tabIndex="-1"
                            autoComplete="off"
                        />

                        <button type="submit" disabled={status === 'sending'}>
                            {status === 'sending' ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>

                    {status === 'sent' && <p className="success">✅ Your message was sent successfully!</p>}
                    {status === 'error' && <p className="error">❌ Something went wrong: {error}</p>}
                </div>
            </div>
        </div>
    );
};

export default ContactPage;


