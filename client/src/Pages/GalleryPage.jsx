import React, { useEffect, useRef, useState } from "react";

const sections = [
    {
        title: "Race Day Highlights",
        type: "photo",
        media: [
            { src: process.env.PUBLIC_URL + "/Assets/Gallery/IMG_7021.jpeg", title: "Chicago Street Circuit" },
            { src: process.env.PUBLIC_URL + "/Assets/Gallery/IMG_7024.jpeg", title: "Chicago Street Circuit" },
            { src: process.env.PUBLIC_URL + "/Assets/Gallery/IMG_7026.jpeg", title: "Chicago Street Circuit" },
            { src: process.env.PUBLIC_URL + "/Assets/Gallery/IMG_7027.jpeg", title: "Chicago Street Circuit" },
            { src: process.env.PUBLIC_URL + "/Assets/Gallery/IMG_7046.jpg", title: "Chicago Street Circuit" },
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

export default function GalleryPage() {
    const [focused, setFocused] = useState({ type: null, src: null });
    const videoRef = useRef();

    const close = () => {
        setFocused({ type: null, src: null });
        videoRef.current?.pause();
    };

    useEffect(() => {
        const handler = (e) => e.key === "Escape" && close();
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);

    return (
        <div className="gallery-page">
            <h1 className="gallery-title">Gallery Highlights</h1>
            {sections.map((sec,i)=>(
                <section key={i} className="gallery-section">
                    <h2 className="section-title">{sec.title}</h2>
                    <div className="media-grid">
                        {sec.media.map((item,j)=>(
                            <div key={j} className="media-card">
                                {sec.type === "photo" ? (
                                    <>
                                        <img
                                            className="media-img"
                                            src={item.src}
                                            alt={item.title}
                                            onClick={()=>setFocused({type:"photo",src:item.src})}
                                        />
                                        <div className="media-title">{item.title}</div>
                                    </>
                                ) : (
                                    <>
                                        <video
                                            className="media-video"
                                            muted
                                            onClick={()=>setFocused({type:"video",src:item.src})}
                                            onMouseOver={e=>e.target.play()}
                                            onMouseOut={e=>e.target.pause()}
                                            src={item.src}
                                        />
                                        <div className="media-title">{item.title}</div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                    {sec.title === "Behind the Scenes" && (
                        <div className="youtube-button-wrapper">
                            <a
                                className="youtube-button"
                                href="https://www.youtube.com/channel/your-channel-id"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Watch More on YouTube
                            </a>
                        </div>
                    )}
                </section>
            ))}

            {focused.src && (
                <div className="overlay" onClick={close}>
                    <span className="close-button">✕</span>
                    {focused.type === "video" ? (
                        <video ref={videoRef} src={focused.src} controls className="overlay-video" />
                    ) : (
                        <img className="overlay-photo" src={focused.src} alt="Detail" />
                    )}
                </div>
            )}
        </div>
    );
}


