require('dotenv').config(); // Load env variables
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;
const API_SECRET = process.env.STREAM_API_SECRET;

app.use(express.json()); // Parse JSON bodies

// Endpoint to generate token
app.post('/token', (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }
  try {
    const payload = {
      user_id: userId,
    };
    const token = jwt.sign(payload, API_SECRET, { expiresIn: '1h' }); // 1 hour expiry
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate token' });
  }
});

// New endpoint to render Hello World in browser
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});