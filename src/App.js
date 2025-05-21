import { Routes, Route } from 'react-router-dom';
import Navbar from "./StaticComps/Navbar";
import HomePage from "./Pages/HomePage";
import ContactPage from "./Pages/ContactPage";
import GalleryPage from "./Pages/GalleryPage";
import SponsorsPage from "./Pages/SponsorsPage";
import Footer from "./StaticComps/Footer";

function App() {

    return (
        <>
                <Navbar />

                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="gallery" element={<GalleryPage />} />
                    <Route path="sponsors" element={<SponsorsPage />} />
                    <Route path="contact" element={<ContactPage />} />
                </Routes>

                <Footer />

        </>
    );
}

export default App