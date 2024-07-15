const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const chatbotRoutes = require('./routes/chatbot');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Define your routes
app.use('/api', chatbotRoutes); // Example: Mount chatbot routes under /api

// Serve your index.html or other static files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
