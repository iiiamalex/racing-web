require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

// 🛠 PATCH: Clean problematic debug env vars that may crash Resend
delete process.env.DEBUG;
delete process.env.DEBUG_URL;

const { Resend } = require('resend');

const app = express();

// ✅ Define trusted origins
const allowedOrigins = [
    'http://localhost:3000',
    'https://racing-web-production.up.railway.app',
    'https://rhoadesracing.live'
];

// ✅ Enable CORS securely
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('❌ Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST'],
    credentials: true
}));

// ✅ Parse incoming JSON
app.use(express.json());

// ✅ Log API key status
if (!process.env.RESEND_API_KEY) {
    console.error("❌ RESEND_API_KEY is missing. Check your .env file.");
    process.exit(1);
} else {
    console.log("✅ Resend API key loaded.");
}

const resend = new Resend(process.env.RESEND_API_KEY);

// ✅ POST endpoint for email submission
app.post('/api/send-email', async (req, res) => {
    const { to, subject, html } = req.body;

    try {
        process.env.DEBUG_URL = process.env.DEBUG_URL || 'noop'; // Patch for SDK bug

        const result = await resend.emails.send({
            from: 'support@rhoadesracing.live',
            to,
            subject,
            html
        });

        console.log("📦 Resend response:", result);

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

// ✅ Fallback for unmatched API routes
app.use('/api', (req, res) => {
    res.status(404).json({ error: 'API endpoint not found' });
});

// ✅ Serve static React build
app.use(express.static(path.join(__dirname, '../client/build')));

// ✅ React Router catch-all
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// ✅ Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

