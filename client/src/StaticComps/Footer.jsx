import React from "react";
import { NavLink } from "react-router-dom";

export default function Footer() {
    const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
    return (
        <footer className="footer">
            <div className="footer-grid">
                <div className="footer-brand">
                    <h2 className="logo-animated">
                        {'Rhoades'.split('').map((c,i)=><span key={i}>{c}</span>)}
                        {'Racing'.split('').map((c,i)=><span key={i} className="accent">{c}</span>)}
                    </h2>
                    <p>Pushing boundaries. Living fast.</p>
                </div>

                <div className="footer-nav">
                    <h4>Navigate</h4>
                    <ul>
                        {["/", "/gallery", "/sponsors", "/contact"].map((path,i)=>(
                            <li key={i}>
                                <NavLink to={path} onClick={scrollTop}>
                                    {path === "/" ? "Portfolio" : path.slice(1).replace(/^\w/, c=>c.toUpperCase())}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="footer-socials">
                    <h4>Connect</h4>
                    <ul>
                        {["instagram","twitter","youtube"].map((s,i)=>(
                            <li key={i}>
                                <a href={`https://${s}.com`} target="_blank" rel="noopener noreferrer">
                                    {s.charAt(0).toUpperCase() + s.slice(1)}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} Rhoades Racing. Built for speed.</p>
            </div>
        </footer>
    );
}
