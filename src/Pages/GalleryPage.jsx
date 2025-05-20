import React, { useState, useRef } from 'react';

const gallerySections = [
    {
        title: "Race Day Highlights",
        type: "photo",
        media: [
            { src: "/Assets/gallery/Race1.jpg", title: "Chicago Street Circuit" },
            { src: "/Assets/gallery/Race2.jpeg", title: "Victory Lap in Phoenix" },
            { src: "/Assets/gallery/Race3.jpeg", title: "Desert Dash Finish" },
            { src: "/Assets/gallery/Race4.jpeg", title: "Desert Dash Finish" },
            { src: "/Assets/gallery/Race5.jpeg", title: "Desert Dash Finish" },
        ],
    },
    {
        title: "Track Action",
        type: "video",
        media: [
            { src: "https://pub-11fe6e6621de4f139652de06caab7aa8.r2.dev/MainRaceVid.mp4", title: "Helmet Cam Sprint" },
            { src: "https://pub-11fe6e6621de4f139652de06caab7aa8.r2.dev/MainRaceVid.mp4", title: "Pit Exit Burnout" },
            { src: "https://pub-11fe6e6621de4f139652de06caab7aa8.r2.dev/MainRaceVid.mp4", title: "Helmet Cam Sprint" },
            { src: "https://pub-11fe6e6621de4f139652de06caab7aa8.r2.dev/MainRaceVid.mp4", title: "Pit Exit Burnout" },
        ],
    },
    {
        title: "Behind the Scenes",
        type: "video",
        media: [
            { src: "https://pub-11fe6e6621de4f139652de06caab7aa8.r2.dev/MainRaceVid.mp4", title: "Pre-Race Prep" },
            { src: "https://pub-11fe6e6621de4f139652de06caab7aa8.r2.dev/MainRaceVid.mp4", title: "Team Strategy Brief" },
            { src: "https://pub-11fe6e6621de4f139652de06caab7aa8.r2.dev/MainRaceVid.mp4", title: "Pre-Race Prep" },
            { src: "https://pub-11fe6e6621de4f139652de06caab7aa8.r2.dev/MainRaceVid.mp4", title: "Team Strategy Brief" },
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

    return (
        <div className="gallery-page">
            <h1 className="gallery-title">Gallery Highlights</h1>

            {gallerySections.map((section, index) => (
                <section className="gallery-section" key={index}>
                    <h2>{section.title}</h2>
                    <div className="media-grid">
                        {section.media.map((item, i) => (
                            <div className="media-card" key={i}>
                                {section.type === "photo" ? (
                                    <>
                                        <img
                                            src={item.src}
                                            alt={item.title}
                                            onClick={() => openPhoto(item.src)}
                                            style={{ cursor: 'zoom-in' }}
                                        />
                                        <div className="media-title">{item.title}</div>
                                    </>
                                ) : (
                                    <>
                                        <video
                                            onClick={() => openVideo(item.src)}
                                            src={item.src}
                                            muted
                                            onMouseOver={(e) => e.target.play()}
                                            onMouseOut={(e) => e.target.pause()}
                                        />
                                        <div className="media-title">{item.title}</div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            ))}

            {(focusedVideo || focusedPhoto) && (
                <div className="video-overlay">
                    <span className="close-button" onClick={closeOverlay}>✕</span>
                    {focusedVideo && (
                        <>
                            <video ref={videoRef} src={focusedVideo} controls />
                            <div className="play-button" onClick={playFocusedVideo}>▶</div>
                        </>
                    )}
                    {focusedPhoto && (
                        <img src={focusedPhoto} alt="Focused" style={{ maxWidth: '90%', maxHeight: '85vh', borderRadius: '1rem', boxShadow: '0 0 25px rgba(255, 68, 68, 0.6)' }} />
                    )}
                </div>
            )}
        </div>
    );
};

export default GalleryPage;