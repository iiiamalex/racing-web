import React from 'react';
import { NavLink } from "react-router-dom";

const Footer = () => {
    const handleScrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="footer">
            <div className="footer-video-background">
                <video autoPlay loop muted playsInline className="footer-video">
                    <source src="https://pub-11fe6e6621de4f139652de06caab7aa8.r2.dev/footerBG.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="footer-overlay"></div>
            </div>

            <div className="footer-grid">
                {/* Brand Logo */}
                <div className="footer-brand">
                    <h2 className="logo-animated">
                        {'Rhoades'.split('').map((char, i) => (
                            <span key={i}>{char}</span>
                        ))}
                        {'Racing'.split('').map((char, i) => (
                            <span key={`r${i}`} className="accent">{char}</span>
                        ))}
                    </h2>
                    <p>Pushing boundaries. Living fast.</p>
                </div>

                {/* Navigation */}
                <div className="footer-nav">
                    <h4>Navigate</h4>
                    <ul>
                        <li><NavLink to="/" onClick={handleScrollTop}>Portfolio</NavLink></li>
                        <li><NavLink to="/gallery" onClick={handleScrollTop}>Gallery</NavLink></li>
                        <li><NavLink to="/sponsors" onClick={handleScrollTop}>Sponsors</NavLink></li>
                        <li><NavLink to="/contact" onClick={handleScrollTop}>Contact</NavLink></li>
                    </ul>
                </div>

                {/* Socials */}
                <div className="footer-socials">
                    <h4>Connect</h4>
                    <ul>
                        <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                        <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                        <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Rhoades Racing. Built for speed.</p>
            </div>
        </footer>
    );
};

export default Footer;