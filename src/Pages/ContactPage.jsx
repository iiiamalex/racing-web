import React, { useState } from 'react';

const ContactPage = () => {

    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState(null); // 'sending' | 'sent' | 'error' | null
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        setError('');

        const payload = {
            to: 'aaguilera.se66@gmail.com', // ✅ Must match Resend sandbox rules
            subject: `Message from  ${formData.name}!`,
            html: `
                <p>You got a message from ${formData.name},</p>
                <p>Their email address is ${formData.email}</p>
                <blockquote>They wrote: ${formData.message}</blockquote>
            `,
        };

        console.log("Sending payload:", payload);

        try {
            const res = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const responseText = await res.text();
            console.log("Server response:", responseText);

            if (!res.ok) {
                let errorMessage = "Unknown server error.";
                try {
                    const errorData = JSON.parse(responseText);
                    errorMessage = errorData.error || errorMessage;
                } catch (_) {
                    errorMessage = responseText;
                }
                throw new Error(errorMessage);
            }

            // Optional: handle the case where there's no ID but success is true
            let responseData;
            try {
                responseData = JSON.parse(responseText);
            } catch (parseErr) {
                throw new Error("Could not parse response JSON.");
            }

            if (responseData.success) {
                console.log("✅ Email was accepted by Resend.");
                setStatus('sent');
                setFormData({ name: '', email: '', message: '' });
            } else {
                throw new Error(responseData.error || "Unknown error occurred.");
            }
        } catch (err) {
            console.error("Error submitting contact form:", err.message);
            setError(err.message);
            setStatus('error');
        }
    };

    return (
        <div className="contact-wrapper">
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

                {status === 'sent' && (
                    <p className="success"> Your message was sent successfully </p>
                )}
                {status === 'error' && (
                    <p className="error"> Something went wrong: {error}</p>
                )}
            </div>
        </div>
    );
};

export default ContactPage;
