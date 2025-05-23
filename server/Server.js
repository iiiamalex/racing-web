const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

// ✅ CORS configuration
const allowedOrigins = [
    'http://localhost:3000',
    'https://racing-web-production.up.railway.app',
    'https://rhoadesracing.live'
];

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

// ✅ Email endpoint using Resend
app.post('/api/send-email', async (req, res) => {
    const { to, subject, html } = req.body;

    if (!process.env.RESEND_API_KEY) {
        console.error('❌ Missing RESEND_API_KEY');
        return res.status(500).json({ error: 'Email service not configured' });
    }

    try {
        const fetch = (...args) =>
            import('node-fetch').then(({ default: fetch }) => fetch(...args));

        const result = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: 'support@rhoadesracing.live',
                to,
                subject,
                html
            })
        });

        const data = await result.json();

        if (!result.ok) {
            console.error('❌ Resend error:', data);
            return res.status(500).json({ error: data.error || 'Failed to send email' });
        }

        console.log('✅ Email sent:', data);
        res.status(200).json({ success: true, id: data.id });

    } catch (err) {
        console.error('❌ Send error:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ✅ Serve frontend only if build exists
const buildPath = path.resolve(__dirname, '../client/build');
if (fs.existsSync(buildPath)) {
    console.log('📦 Serving static from:', buildPath);
    app.use(express.static(buildPath));

    app.get('/*', (req, res) => {
        const indexPath = path.join(buildPath, 'index.html');
        console.log('📄 Fallback route hit. Serving:', indexPath);

        res.sendFile(indexPath, (err) => {
            if (err) {
                console.error('❌ sendFile error:', err);
                res.status(500).send('Error loading frontend');
            }
        });
    });
} else {
    console.warn('⚠️ React build not found at:', buildPath);
    app.get('/*', (req, res) => {
        res.status(503).send('Frontend not built. Please run npm run build in client.');
    });
}

// ✅ Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
