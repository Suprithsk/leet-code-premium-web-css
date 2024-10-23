const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose= require('mongoose');

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;

// const authRoutes = require('./routes/authRoutes');
app.use(cors());
app.use(bodyParser.json());

// app.use('/api/auth', authRoutes);
app.use('/api/questions', require('./routes/questionRoutes'));
// app.use('/api/solvedQuestions', require('./routes/solvedQuestions'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose.connect(process.env.MONGODB_URI, {
}).then(() => {
    console.log('Connected to MongoDB',process.env.MONGODB_URI);
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});