const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const { Resend } = require('resend');

dotenv.config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

// ✅ CORS Configuration
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

app.use(express.json());

// ✅ Email Route
app.post('/api/send-email', async (req, res) => {
    const { to, subject, html } = req.body;

    if (!process.env.RESEND_API_KEY) {
        console.error('❌ Missing RESEND_API_KEY');
        return res.status(500).json({ error: 'Email service not configured' });
    }

    try {
        const result = await resend.emails.send({
            from: 'support@rhoadesracing.live',
            to,
            subject,
            html
        });

        console.log('✅ Email sent:', result);
        res.status(200).json({ success: true, id: result.id });
    } catch (error) {
        console.error('❌ Resend error:', error);
        res.status(500).json({ error: error.message || 'Failed to send email' });
    }
});

// ✅ Serve Frontend If Built
const buildPath = path.resolve(__dirname, '../client/build');

if (fs.existsSync(buildPath)) {
    console.log('📦 Serving static from:', buildPath);
    app.use(express.static(buildPath));

    app.get('/*', (req, res) => {
        const indexPath = path.join(buildPath, 'index.html');
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

// ✅ Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
