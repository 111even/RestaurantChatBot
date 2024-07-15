const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const chatbotRoutes = require('./routes/chatbot');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/', chatbotRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
