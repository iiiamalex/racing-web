require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

// 🛠 PATCH: remove problematic debug vars to prevent Resend crash
delete process.env.DEBUG;
delete process.env.DEBUG_URL;

const { Resend } = require('resend');

const app = express();

// ✅ Enable CORS
const allowedOrigins = ['http://localhost:3000', 'https://racing-web-production.up.railway.app']; // Add your custom domain later
app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true
}));

// ✅ Parse JSON requests
app.use(express.json());

// ✅ Log API key status
if (!process.env.RESEND_API_KEY) {
    console.error("❌ RESEND_API_KEY is missing. Check your .env file.");
    process.exit(1);
} else {
    console.log("✅ Resend API key loaded.");
}

const resend = new Resend(process.env.RESEND_API_KEY);

// ✅ Email endpoint
app.post('/api/send-email', async (req, res) => {
    const { to, subject, html } = req.body;

    try {
        // 🛠 PATCH: Add fallback in case DEBUG_URL is required internally
        process.env.DEBUG_URL = process.env.DEBUG_URL || 'noop';

        const result = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to,
            subject,
            html
        });

        console.log("📦 Full Resend Response:", result);

        if (result.error) {
            throw new Error(result.error.message);
        }

        console.log("✅ Email sent. ID:", result.id || '[no ID returned]');
        return res.status(200).json({ success: true, id: result.id || null });

    } catch (err) {
        console.error("❌ Resend error:", err.message || err);
        return res.status(500).json({ success: false, error: err.message || "Unexpected error" });
    }
});

// ✅ Serve static React files
app.use(express.static(path.join(__dirname, '../client/build')));

// ✅ Catch-all: send React's index.html on unknown routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// ✅ Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});


