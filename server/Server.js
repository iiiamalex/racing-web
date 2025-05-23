const express = require('express');
const cors = require('cors');
const path = require('path'); // ✅ Needed to resolve build paths

const app = express();

const allowedOrigins = [
    'http://localhost:3000',
    'https://racing-web-production.up.railway.app',
    'https://rhoadesracing.live'
];

// CORS middleware
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

// ✅ Serve React build folder
app.use(express.static(path.join(__dirname, '../client/build')));

// ✅ API health or base test route
app.get('/api', (req, res) => res.json({ status: 'API is live' }));

// ✅ React fallback for any route not handled above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});


// require('dotenv').config();
// const path = require('path');
//
// // Polyfill fetch
// const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
//

// if (!process.env.RESEND_API_KEY) {
//     console.error("❌ RESEND_API_KEY is missing. Check your .env file.");
//     process.exit(1);
// } else {
//     console.log("✅ Resend API key loaded.");
// }
//
// app.post('/api/send-email', async (req, res) => {
//     const { to, subject, html } = req.body;
//
//     if (!to || !subject || !html) {
//         return res.status(400).json({ success: false, error: 'Missing required fields' });
//     }
//
//     try {
//         const result = await fetch('https://api.resend.com/emails', {
//             method: 'POST',
//             headers: {
//                 Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 from: 'support@rhoadesracing.live',
//                 to,
//                 subject,
//                 html
//             })
//         });
//
//         const data = await result.json();
//
//         if (!result.ok) {
//             console.error("❌ Resend API error:", data);
//             return res.status(500).json({ success: false, error: data.error || 'Resend API error' });
//         }
//
//         console.log("✅ Email sent:", data);
//         res.status(200).json({ success: true, id: data.id });
//
//     } catch (err) {
//         console.error("❌ Email send failed:", err.message);
//         res.status(500).json({ success: false, error: err.message });
//     }
// });
//
// app.use('/api', (req, res) => {
//     res.status(404).json({ error: 'API endpoint not found' });
// });
//
// app.use(express.static(path.join(__dirname, '../client/build')));
//
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });
//
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//     console.log(`🚀 Server is running on http://localhost:${PORT}`);
// });




