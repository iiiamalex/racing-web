import {useNavigate} from "react-router-dom";
import React from "react";

function SponsorsPage() {
    const navigate = useNavigate();
    return (
        <div className='home '>
            <section className='hero'>
                <div className="hero-overlay">
                    <h1 className="hero-title"> Sponsors </h1>
                    <p className="hero-tagline">Working on this shortly</p>
                    <div className="hero-buttons">
                        <button className="btn-red" onClick={() =>navigate('/')}>Go Back</button>
                    </div>
                </div>
            </section>
        </div>

    )
}
export default SponsorsPage;