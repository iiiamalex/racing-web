const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");
const { Resend } = require("resend");

dotenv.config();
if (!process.env.RESEND_API_KEY) {
    console.error("❌ Missing RESEND_API_KEY"); process.exit(1);
}

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

const allowedOrigins = [
    "http://localhost:3000",
    process.env.CLIENT_URL_PROD,
    "https://rhoadesracing.live"
];

app.use(helmet());
app.use(compression());
app.use(cors({
    origin: (o, cb) => (!o || allowedOrigins.includes(o)) ? cb(null, true) : cb(new Error("Not allowed by CORS")),
    credentials: true
}));
app.use(express.json());

app.post("/api/send-email", async (req, res) => {
    const { to, subject, html } = req.body;
    try {
        const result = await resend.emails.send({
            from: "support@rhoadesracing.live",
            to, subject, html
        });
        console.log("✅ Email sent:", result.id);
        res.json({ success: true, id: result.id });
    } catch (err) {
        console.error("❌ Resend error:", err);
        res.status(500).json({ error: err.message });
    }
});

// Serve React build
const buildPath = path.join(__dirname, "../client/build");
if (fs.existsSync(buildPath)) {
    app.use(express.static(buildPath));
    app.get("/*", (_, res) => res.sendFile(path.join(buildPath, "index.html")));
} else {
    console.warn("⚠️ React build not found");
    app.get("/*", (_, res) => res.status(503).send("Frontend not built"));
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

