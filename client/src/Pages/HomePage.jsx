import React, { useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import CountUp from "react-countup";
import Countdown from "../CompTools/Countdown";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const name = "Mark", lastName = "Rhoades";
    const stats = { wins: 1, laps: 2, champs: 3 };
    const events = [
        {
            iso: "2025-05-23T00:00:00Z",
            label: "May 23, 2025 – Chicago, IL",
            name: "Grand Prix Showdown",
            desc: "Mark's return to the spotlight in this prestigious race.",
        },
        {
            iso: "2025-05-24T00:00:00Z",
            label: "May 24, 2025 – Chicago, IL",
            name: "Speed City Clash",
            desc: "Competing with top racers from around the country.",
        },
        {
            iso: "2025-05-25T00:00:00Z",
            label: "May 25, 2025 – Chicago, IL",
            name: "Urban Drift Fest",
            desc: "An intense race through Chicago's urban layout.",
        },
        {
            iso: "2025-05-26T00:00:00Z",
            label: "May 26, 2025 – Chicago, IL",
            name: "Final Circuit",
            desc: "The final lap of this racing season.",
        },
    ];

    const navigate = useNavigate();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add("visible")),
            { threshold: 0.1 }
        );
        document.querySelectorAll("section").forEach(s => observer.observe(s));
        return () => observer.disconnect();
    }, []);

    return (
        <main className="home">
            <section className="hero landing-page">
                <video className="hero-video" autoPlay loop muted playsInline>
                    <source
                        src="https://pub-11fe6e6621de4f139652de06caab7aa8.r2.dev/MainRaceVid.mp4"
                        type="video/mp4"
                    />
                </video>
                <div className="hero-overlay">
                    <h1 className="hero-title">
                        <TypeAnimation sequence={[`${name} ${lastName}`, 1000]} wrapper="span" speed={2} repeat={0} />
                    </h1>
                    <p className="hero-tagline">"Chasing Victory, One Lap at a Time"</p>
                    <div className="hero-buttons">
                        <button className="btn-red" onClick={() => navigate("/gallery")}>View Gallery</button>
                        <button className="btn-white" onClick={() => navigate("/contact")}>Contact</button>
                    </div>
                </div>
            </section>

            <section className="about fade-in">
                <h2 className="section-title">Meet the Racer</h2>
                <p className="section-text">
                    {name} is a professional racer from Chicago, IL. He is a certified competitor with victories in multiple major events.
                </p>
            </section>

            <section className="highlights fade-in">
                <h2 className="section-title">Career Highlights</h2>
                <div className="highlight-grid">
                    <div className="highlight-card">
                        <h3>1st Place Finishes</h3>
                        <p className="highlight-value"><CountUp end={stats.wins} duration={2} /></p>
                    </div>
                    <div className="highlight-card">
                        <h3>Fastest Laps</h3>
                        <p className="highlight-value"><CountUp end={stats.laps} duration={2} /></p>
                    </div>
                    <div className="highlight-card">
                        <h3>Championships</h3>
                        <p className="highlight-value"><CountUp end={stats.champs} duration={2} /></p>
                    </div>
                </div>
            </section>

            <section className="media fade-in">
                <h2 className="section-title">In Action</h2>
                <div className="video-container">
                    <video className="video" controls autoPlay loop muted>
                        <source
                            src="https://pub-11fe6e6621de4f139652de06caab7aa8.r2.dev/MainRaceVid.mp4"
                            type="video/mp4"
                        />
                    </video>
                </div>
            </section>

            <section className="countdown fade-in">
                <h2 className="section-title">Next Race Countdown</h2>
                <Countdown targetDateISO={events[0].iso} />
            </section>

            <section className="events fade-in">
                <h2 className="section-title">Upcoming Events</h2>
                <div className="event-grid">
                    {events.map((e,i)=>(
                        <div className="event-card" key={i}>
                            <h3>{e.label}</h3>
                            <p>{e.name}</p>
                            <p>{e.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}



