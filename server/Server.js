require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fetch = require('node-fetch'); // ✅ Using fetch instead of Resend SDK

const app = express();

// ✅ Define allowed CORS origins
const allowedOrigins = [
    'http://localhost:3000',
    'https://racing-web-production.up.railway.app',
    'https://rhoadesracing.live'
];

// ✅ CORS config with origin filtering
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST'],
    credentials: true
}));

// ✅ Parse JSON bodies
app.use(express.json());

// ✅ Check Resend API key
if (!process.env.RESEND_API_KEY) {
    console.error("❌ RESEND_API_KEY is missing. Check your .env file.");
    process.exit(1);
} else {
    console.log("✅ Resend API key loaded.");
}

// ✅ Email send endpoint using direct REST API
app.post('/api/send-email', async (req, res) => {
    const { to, subject, html } = req.body;

    try {
        const result = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: 'support@rhoadesracing.live', // ✅ Your verified sending domain
                to,
                subject,
                html
            })
        });

        const data = await result.json();

        if (!result.ok) {
            console.error("❌ Resend error:", data);
            throw new Error(data.error || 'Unknown Resend error');
        }

        console.log("✅ Email sent:", data);
        res.status(200).json({ success: true, id: data.id });

    } catch (err) {
        console.error("❌ Email send failed:", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

// ✅ Fallback for unmatched API routes
app.use('/api', (req, res) => {
    res.status(404).json({ error: 'API endpoint not found' });
});

// ✅ Serve static React build
app.use(express.static(path.join(__dirname, '../client/build')));

// ✅ Catch-all route for React Router
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// ✅ Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

