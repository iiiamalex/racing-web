import React, { useState, useRef, useEffect } from 'react';

const gallerySections = [
    {
        title: "Race Day Highlights",
        type: "photo",
        media: [
            { src: "/Assets/Gallery/Race2.jpg", title: "Chicago Street Circuit" },
            { src: "/Assets/Gallery/Race3.jpeg", title: "Victory Lap in Phoenix" },
            { src: "/Assets/Gallery/Race3.jpeg", title: "Desert Dash Finish" },
        ],
    },
    {
        title: "Track Action",
        type: "video",
        media: [
            {
                src: "https://pub-11fe6e6621de4f139652de06caab7aa8.r2.dev/MainRaceVid.mp4",
                title: "Helmet Cam Sprint",
            },
            {
                src: "https://pub-11fe6e6621de4f139652de06caab7aa8.r2.dev/MainRaceVid.mp4",
                title: "Pit Exit Burnout",
            },
        ],
    },
    {
        title: "Behind the Scenes",
        type: "video",
        media: [
            {
                src: "https://pub-11fe6e6621de4f139652de06caab7aa8.r2.dev/MainRaceVid.mp4",
                title: "Team Strategy Brief",
            },
        ],
    },
];

const GalleryPage = () => {
    const [focusedVideo, setFocusedVideo] = useState(null);
    const [focusedPhoto, setFocusedPhoto] = useState(null);
    const videoRef = useRef(null);

    const openVideo = (src) => {
        setFocusedPhoto(null);
        setFocusedVideo(src);
    };

    const openPhoto = (src) => {
        setFocusedVideo(null);
        setFocusedPhoto(src);
    };

    const closeOverlay = () => {
        if (videoRef.current) videoRef.current.pause();
        setFocusedVideo(null);
        setFocusedPhoto(null);
    };

    const playFocusedVideo = () => {
        if (videoRef.current) videoRef.current.play();
    };

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') closeOverlay();
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, []);

    return (
        <div className="gallery-page">
            <h1 className="gallery-title">Gallery Highlights</h1>

            {gallerySections.map((section, index) => (
                <section className="gallery-section" key={index}>
                    <h2 className="section-title">{section.title}</h2>
                    <div className="media-grid">
                        {section.media.map((item, i) => (
                            <div className="media-card" key={i}>
                                {section.type === "photo" ? (
                                    <>
                                        <img
                                            src={item.src}
                                            alt={item.title}
                                            onClick={() => openPhoto(item.src)}
                                            className="media-img"
                                        />
                                        <div className="media-title">{item.title}</div>
                                    </>
                                ) : (
                                    <>
                                        <video
                                            src={item.src}
                                            muted
                                            className="media-video"
                                            onClick={() => openVideo(item.src)}
                                            onMouseOver={(e) => e.target.play()}
                                            onMouseOut={(e) => e.target.pause()}
                                        />
                                        <div className="media-title">{item.title}</div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Add YouTube button under Behind the Scenes */}
                    {section.title === "Behind the Scenes" && (
                        <div className="youtube-button-wrapper">
                            <a
                                href="https://www.youtube.com/channel/your-channel-id"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="youtube-button"
                            >
                                Watch More on YouTube
                            </a>
                        </div>
                    )}
                </section>
            ))}

            {(focusedVideo || focusedPhoto) && (
                <div className="overlay">
                    <span className="close-button" onClick={closeOverlay}>✕</span>

                    {focusedVideo && (
                        <>
                            <video ref={videoRef} src={focusedVideo} controls className="overlay-video" />
                            <div className="play-button" onClick={playFocusedVideo}>▶ Play Video</div>
                        </>
                    )}

                    {focusedPhoto && (
                        <img src={focusedPhoto} alt="Focused" className="overlay-photo" />
                    )}
                </div>
            )}
        </div>
    );
};

export default GalleryPage;

