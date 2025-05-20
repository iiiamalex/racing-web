import { TypeAnimation } from "react-type-animation";
import CountUp from "react-countup";
import CountdownTimer from "../CompTools/Countdown";
import { useNavigate } from "react-router-dom";


function HomePage({}) {
    const name = "Mark";
    const lastName = "Rhoades";
    const stats = [1, 2, 3];


    const upcomingEvents = [
        {
            date: 'May 23, 2025 - Chicago, IL',
            name: 'asdjkfha',
            description: 'adsfasdf',
        },
        {
            date: 'May 24, 2025 - Chicago, IL',
            name: 'asdjkfha',
            description: 'adsfasdf',
        },
        {
            date: 'May 24, 2025 - Chicago, IL',
            name: 'asdjkfha',
            description: 'adsfasdf',
        },
        {
            date: 'May 24, 2025 - Chicago, IL',
            name: 'asdjkfha',
            description: 'adsfasdf',
        },
    ];

    const nextEventDate = upcomingEvents[0].date.split(' - ')[0];
    const navigate = useNavigate();

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                {/* Background Video */}
                <video
                    className="hero-video"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src='https://pub-11fe6e6621de4f139652de06caab7aa8.r2.dev/MainRaceVid.mp4' type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Overlay Content */}
                <div className="hero-overlay">
                    <h1 className="hero-title">
                        <TypeAnimation
                            sequence={[
                                `${name} ${lastName}`,
                                1000,
                            ]}
                            wrapper="span"
                            speed={2}
                            style={{ fontSize: '2.5rem', display: 'inline-block' }}
                            repeat={0}
                        />
                    </h1>
                    <p className="hero-tagline">"Chasing Victory, One Lap at a Time"</p>
                    <div className="hero-buttons">
                        <button className="btn-red" onClick={() => navigate('/gallery')}>View Gallery</button>
                        <button className="btn-white" onClick={() => navigate('/contact')}>
                            Contact
                        </button>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="about">
                <h2 className="section-title">Meet the Racer</h2>
                <p className="section-text">
                    {name} is a professional racer from Chicago, IL. He is a certified racer and has competed in over X races.
                </p>
            </section>

            {/* Highlights Section */}
            <section className="highlights">
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

            {/* Media Section */}
            <section className="media">
                <h2 className="section-title">In Action</h2>
                <p className="section-text">Watch Mark tear up the track in these intense race moments.</p>
                <div className="video-container">
                    <video className="video" controls autoPlay loop muted>
                        <source src="https://pub-11fe6e6621de4f139652de06caab7aa8.r2.dev/MainRaceVid.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </section>

            {/* Countdown Timer */}
            <section className="countdown">
                <h2 className="section-title">Next Race Countdown</h2>
                <CountdownTimer targetDate={nextEventDate} />
            </section>

            {/* Upcoming Events Section */}
            <section className="events">
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
        </div>
    );
}

export default HomePage;