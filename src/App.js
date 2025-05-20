import { Routes, Route, Link } from 'react-router-dom';
import Navbar from "./StaticComps/Navbar";
import HomePage from "./Pages/HomePage";
import ContactPage from "./Pages/ContactPage";
import GalleryPage from "./Pages/GalleryPage";
import SponsorsPage from "./Pages/SponsorsPage";
import Footer from "./StaticComps/Footer";

function App() {

    return (
        <>
            <div className="global-video-wrapper">
                <video autoPlay muted loop playsInline className="global-bg-video">
                    <source src="https://pub-11fe6e6621de4f139652de06caab7aa8.r2.dev/mainBG.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="global-video-overlay"></div>
            </div>

            <div className="app-content">

                <Navbar />

                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="gallery" element={<GalleryPage />} />
                    <Route path="sponsors" element={<SponsorsPage />} />
                    <Route path="contact" element={<ContactPage />} />
                </Routes>

                <Footer />

            </div>
        </>
    );
}

export default App