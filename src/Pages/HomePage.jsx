import { TypeAnimation } from "react-type-animation";
import CountUp from "react-countup";
import CountdownTimer from "../CompTools/Countdown";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function HomePage() {
    const name = "Mark";
    const lastName = "Rhoades";
    const stats = [1, 2, 3];

    const upcomingEvents = [
        {
            date: "May 23, 2025 - Chicago, IL",
            name: "Grand Prix Showdown",
            description: "Mark's return to the spotlight in this prestigious race.",
        },
        {
            date: "May 24, 2025 - Chicago, IL",
            name: "Speed City Clash",
            description: "Competing with top racers from around the country.",
        },
        {
            date: "May 25, 2025 - Chicago, IL",
            name: "Urban Drift Fest",
            description: "An intense race through Chicago's urban layout.",
        },
        {
            date: "May 26, 2025 - Chicago, IL",
            name: "Final Circuit",
            description: "The final lap of this racing season.",
        },
    ];

    const nextEventDate = upcomingEvents[0].date.split(" - ")[0];
    const navigate = useNavigate();

    useEffect(() => {
        const sections = document.querySelectorAll("section");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }
                });
            },
            {
                threshold: 0.1,
            }
        );

        sections.forEach((section) => observer.observe(section));

        return () => {
            sections.forEach((section) => observer.unobserve(section));
        };
    }, []);

    return (
        <main className="home">
            <section className="hero landing-page">
                <video
                    className="hero-video"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source
                        src="https://pub-11fe6e6621de4f139652de06caab7aa8.r2.dev/MainRaceVid.mp4"
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>

                <div className="hero-overlay">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            <TypeAnimation
                                sequence={[`${name} ${lastName}`, 1000]}
                                wrapper="span"
                                speed={2}
                                style={{ display: "inline-block" }}
                                repeat={0}
                            />
                        </h1>
                        <p className="hero-tagline">"Chasing Victory, One Lap at a Time"</p>
                        <div className="hero-buttons">
                            <button className="btn-red" onClick={() => navigate("/gallery")}>View Gallery</button>
                            <button className="btn-white" onClick={() => navigate("/contact")}>Contact</button>
                        </div>
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
                        <p className="highlight-value"><CountUp end={stats[0]} duration={2} /></p>
                    </div>
                    <div className="highlight-card">
                        <h3>Fastest Laps</h3>
                        <p className="highlight-value"><CountUp end={stats[1]} duration={2} /></p>
                    </div>
                    <div className="highlight-card">
                        <h3>Championships</h3>
                        <p className="highlight-value"><CountUp end={stats[2]} duration={2} /></p>
                    </div>
                </div>
            </section>

            <section className="media fade-in">
                <h2 className="section-title">In Action</h2>
                <p className="section-text">Watch Mark tear up the track in these intense race moments.</p>
                <div className="video-container">
                    <video className="video" controls autoPlay loop muted>
                        <source
                            src="https://pub-11fe6e6621de4f139652de06caab7aa8.r2.dev/MainRaceVid.mp4"
                            type="video/mp4"
                        />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </section>

            <section className="countdown fade-in">
                <h2 className="section-title">Next Race Countdown</h2>
                <CountdownTimer targetDate={nextEventDate} />
            </section>

            <section className="events fade-in">
                <h2 className="section-title">Upcoming Events</h2>
                <div className="event-grid">
                    {upcomingEvents.map((event, index) => (
                        <div className="event-card" key={index}>
                            <h3>{event.date}</h3>
                            <p>{event.name}</p>
                            <p>{event.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}

export default HomePage;


