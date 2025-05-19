const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

// Connexion MongoDB
mongoose.connect('mongodb://localhost:27017/kafkamessages')
  .then(() => console.log('MongoDB connecté'))
  .catch(err => console.error(err));

// Modèle (doit être le même que dans consumer.js)
const Message = mongoose.model('Message', {
  content: String,
  timestamp: { type: Date, default: Date.now }
});

// Routes API
app.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route de test
app.get('/', (req, res) => {
  res.send('API Kafka-MongoDB opérationnelle. Accédez à /messages');
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`API disponible sur http://localhost:${PORT}`);
});