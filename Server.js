require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');

const app = express();

// Enable CORS for all origins (adjust in production)
app.use(cors());

// Parse JSON requests
app.use(express.json());

// Log API key status
if (!process.env.RESEND_API_KEY) {
    console.error("❌ RESEND_API_KEY is missing. Check your .env file.");
    process.exit(1);
} else {
    console.log("✅ Resend API key loaded.");
}

const resend = new Resend(process.env.RESEND_API_KEY);

// POST endpoint to send email
app.post('/api/send-email', async (req, res) => {
    const { to, subject, html } = req.body;

    try {
        const result = await resend.emails.send({
            from: 'onboarding@resend.dev', // Sandbox sender only ** Change when in Production
            to,
            subject,
            html
        });

        // Debugging Usage
        console.log("📦 Full Resend Response:", result);

        if (result.error) {
            throw new Error(result.error.message);
        }

        if (result.error) {
            throw new Error(result.error.message);
        }

        console.log("✅ Email sent. ID:", result.id || '[no ID returned]');
        res.status(200).json({ success: true, id: result.id || null });


        console.log("✅ Email sent successfully. ID:", result.id);
        res.status(200).json({ success: true, id: result.id });

    } catch (err) {
        console.error("❌ Resend error:", err.message || err);
        res.status(500).json({ success: false, error: err.message || "Unexpected error" });
    }
});

// Start server
app.listen(3001, () => {
    console.log('🚀 Email API listening on http://localhost:3001');
});

const path = require('path');

// Serve React frontend
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
