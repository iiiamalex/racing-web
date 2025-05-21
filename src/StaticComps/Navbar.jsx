import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(prev => {
            const next = !prev;
            document.body.classList.toggle("menu-open", next);
            return next;
        });
    };

    return (

        <nav className="navbar">

            <NavLink to="/" className="logo" onClick={() => setMenuOpen(false)}>
                Rhoades<span className="red-logo">Racing</span>
            </NavLink>


            <div className={`nav-links ${menuOpen ? "open" : ""}`}>
                <NavLink to="/" end onClick={() => setMenuOpen(false)}>
                    Portfolio
                </NavLink>
                <NavLink to="/gallery" onClick={() => setMenuOpen(false)}>
                    Gallery
                </NavLink>
                <NavLink to="/sponsors" onClick={() => setMenuOpen(false)}>
                    Sponsors
                </NavLink>
                <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
                    Contact
                </NavLink>
            </div>

            <div className={`hamburger ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
                <span className="bar top"></span>
                <span className="bar middle"></span>
                <span className="bar bottom"></span>
            </div>
        </nav>

    );
};

export default Navbar;