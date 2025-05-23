import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const toggle = () => {
        document.body.classList.toggle("menu-open", !open);
        setOpen((o) => !o);
    };

    return (
        <nav className="navbar">
            <NavLink to="/" className="logo" onClick={() => setOpen(false)}>
                <img
                    src="https://pub-11fe6e6621de4f139652de06caab7aa8.r2.dev/RR_Logo%20NO%20BACKGROUND.png"
                    alt="Rhoades Racing Logo"
                    className="logo-img"
                />
            </NavLink>

            <div className={`nav-links ${open ? "open" : ""}`}>
                {["Portfolio", "Gallery", "Sponsors", "Contact"].map((name) => {
                    const to = name === "Portfolio" ? "/" : `/${name.toLowerCase()}`;
                    return (
                        <NavLink
                            key={name}
                            to={to}
                            end={to === "/"}
                            className={({ isActive }) => (isActive ? "active" : "")}
                            onClick={() => setOpen(false)}
                        >
                            {name}
                        </NavLink>
                    );
                })}
            </div>

            <div className={`hamburger ${open ? "open" : ""}`} onClick={toggle}>
                <span className="bar top" />
                <span className="bar middle" />
                <span className="bar bottom" />
            </div>
        </nav>
    );
}
