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

//
// const express = require('express');
// const cors = require('cors');
// const app = express();
//
// const allowedOrigins = [
//     'http://localhost:3000',
//     'https://racing-web-production.up.railway.app',
//     'https://rhoadesracing.live'
// ];
//
// app.use(cors({
//     origin: (origin, callback) => {
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     methods: ['GET', 'POST'],
//     credentials: true
// }));
//
// app.use(express.json());
//
// app.get('/', (req, res) => res.send('Hello World!'));
//
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//     console.log(`✅ Server running on port ${PORT}`);
// });
