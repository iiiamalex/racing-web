import React from "react";
import { useNavigate } from "react-router-dom";

const sponsors = [
    { name: "Precision", logo: "https://pub-11fe6e6621de4f139652de06caab7aa8.r2.dev/RR_Logo%20NO%20BACKGROUND.png" },
    { name: "ScratchedDentDing", logo: "https://pub-11fe6e6621de4f139652de06caab7aa8.r2.dev/RR_Logo%20NO%20BACKGROUND.png" },
    { name: "ScratchedDentDing", logo: "https://pub-11fe6e6621de4f139652de06caab7aa8.r2.dev/RR_Logo%20NO%20BACKGROUND.png" },
    { name: "ScratchedDentDing", logo: "https://pub-11fe6e6621de4f139652de06caab7aa8.r2.dev/RR_Logo%20NO%20BACKGROUND.png" },
    { name: "ScratchedDentDing", logo: "https://pub-11fe6e6621de4f139652de06caab7aa8.r2.dev/RR_Logo%20NO%20BACKGROUND.png" },
    { name: "ScratchedDentDing", logo: "https://pub-11fe6e6621de4f139652de06caab7aa8.r2.dev/RR_Logo%20NO%20BACKGROUND.png" },
    { name: "ScratchedDentDing", logo: "https://pub-11fe6e6621de4f139652de06caab7aa8.r2.dev/RR_Logo%20NO%20BACKGROUND.png" },
    { name: "ScratchedDentDing", logo: "https://pub-11fe6e6621de4f139652de06caab7aa8.r2.dev/RR_Logo%20NO%20BACKGROUND.png" },
    { name: "ScratchedDentDing", logo: "https://pub-11fe6e6621de4f139652de06caab7aa8.r2.dev/RR_Logo%20NO%20BACKGROUND.png" },
    { name: "ScratchedDentDing", logo: "https://pub-11fe6e6621de4f139652de06caab7aa8.r2.dev/RR_Logo%20NO%20BACKGROUND.png" },
    { name: "ScratchedDentDing", logo: "https://pub-11fe6e6621de4f139652de06caab7aa8.r2.dev/RR_Logo%20NO%20BACKGROUND.png" },
    { name: "ScratchedDentDing", logo: "https://pub-11fe6e6621de4f139652de06caab7aa8.r2.dev/RR_Logo%20NO%20BACKGROUND.png" },
    { name: "ScratchedDentDing", logo: "https://pub-11fe6e6621de4f139652de06caab7aa8.r2.dev/RR_Logo%20NO%20BACKGROUND.png" },
];

const SponsorsPage = () => {
    const navigate = useNavigate();

    return (
        <div className="sponsors-page">
            <section className="sponsors-hero">
                <div className="sponsors-overlay">
                    <h1 className="sponsors-title">Our Sponsors</h1>
                    <p className="sponsors-subtitle">Fueling our passion. Driving our success.</p>
                    <div className="hero-buttons">
                        <button className="btn-red" onClick={() => navigate('/')}>Go Back</button>
                    </div>
                </div>
            </section>

            <section className="sponsor-roll-section">
                <h2 className="grid-header">Trusted Partners</h2>

                <div className="sponsor-carousel">
                    <div className="sponsor-track">
                        {[...sponsors, ...sponsors].map((sponsor, index) => (
                            <div className="sponsor-logo" key={index}>
                                <img src={sponsor.logo} alt={sponsor.name} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="cta-section">
                    <h3>Want to partner with us?</h3>
                    <a href="mailto:aaguilera.se66@gmail.com" className="btn-red">
                        Become a Sponsor
                    </a>
                </div>
            </section>
        </div>
    );
};

export default SponsorsPage;








