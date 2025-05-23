import React, { useEffect, useRef, useState } from "react";

export default function ContactPage() {
    const [fd, setFd] = useState({ name: "", email: "", message: "", honeypot: "" });
    const [status, setStatus] = useState("idle");
    const videoRef = useRef();

    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;
        const loop = () => {
            if (v.duration - v.currentTime < 0.3) {
                v.currentTime = 0;
                v.play();
            }
        };
        v.addEventListener("timeupdate", loop);
        return () => v.removeEventListener("timeupdate", loop);
    }, []);

    const handle = (e) => setFd(p => ({ ...p, [e.target.name]: e.target.value }));
    const sanitize = (s) => s.replace(/[<>]/g, "");

    const submit = async (e) => {
        e.preventDefault();
        if (fd.honeypot) return;
        setStatus("sending");
        try {
            const res = await fetch(
                `${process.env.REACT_APP_API_BASE_URL}/api/send-email`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({
                        to: "aaguilera.se66@gmail.com",
                        subject: `New message from ${sanitize(fd.name)} (${sanitize(fd.email)})`,
                        html: `<p><strong>Message:</strong></p><blockquote>${sanitize(fd.message)}</blockquote>`
                    })
                }
            );
            const data = await res.json();
            if (!res.ok || !data.success) throw new Error(data.error || "Failed to send");
            setStatus("sent");
            setFd({ name: "", email: "", message: "", honeypot: "" });
        } catch {
            setStatus("error");
        }
    };

    return (
        <div className="contact-video-wrapper">
            <video
                ref={videoRef}
                className="video-background"
                autoPlay muted playsInline
                src="https://pub-11fe6e6621de4f139652de06caab7aa8.r2.dev/contactBG.mp4"
            />
            <div className="contact-overlay">
                <div className="contact-page">
                    <h2 className="contact-title">Get in Touch</h2>
                    <form className="contact-form" onSubmit={submit}>
                        <input required name="name" type="text" placeholder="Your Name" value={fd.name} onChange={handle}/>
                        <input required name="email" type="email" placeholder="Your Email" value={fd.email} onChange={handle}/>
                        <textarea required name="message" placeholder="Your Message" value={fd.message} onChange={handle}/>
                        <input name="honeypot" style={{display:"none"}} value={fd.honeypot} onChange={handle}/>
                        <button type="submit" disabled={status==="sending"}>
                            {status==="sending" ? "Sending…" : "Send Message"}
                        </button>
                    </form>
                    {status==="sent" && <p className="success">✅ Your message was sent successfully!</p>}
                    {status==="error" && <p className="error">❌ Something went wrong, please try again.</p>}
                </div>
            </div>
        </div>
    );
}





