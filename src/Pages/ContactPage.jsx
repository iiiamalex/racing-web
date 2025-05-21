import React, { useState, useRef, useEffect } from 'react';

const ContactPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState(null);
    const [error, setError] = useState('');

    const videoRef = useRef(null);

    // Seamless looping logic
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        setError('');

        const payload = {
            to: 'aaguilera.se66@gmail.com',
            subject: `Message from ${formData.name}!`,
            html: `
                <p>You got a message from ${formData.name},</p>
                <p>Their email address is ${formData.email}</p>
                <blockquote>They wrote: ${formData.message}</blockquote>
            `,
        };

        try {
            const res = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const text = await res.text();
            const data = JSON.parse(text);

            if (res.ok && data.success) {
                setStatus('sent');
                setFormData({ name: '', email: '', message: '' });
            } else {
                throw new Error(data.error || "Unknown error");
            }
        } catch (err) {
            setError(err.message);
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
                        <button type="submit" disabled={status === 'sending'}>
                            {status === 'sending' ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>

                    {status === 'sent' && <p className="success">Your message was sent successfully</p>}
                    {status === 'error' && <p className="error">Something went wrong: {error}</p>}
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
