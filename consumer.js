const { Kafka } = require('kafkajs');
const mongoose = require('mongoose');

// Connexion MongoDB
mongoose.connect('mongodb://localhost:27017/kafkamessages')
  .then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error('Erreur MongoDB:', err));

// Modèle de message
const Message = mongoose.model('Message', {
  content: String,
  timestamp: { type: Date, default: Date.now }
});

// Configuration Kafka
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'kafka-mongo-group' });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const msgContent = message.value.toString();
      console.log('Message reçu:', msgContent);
      
      // Insertion dans MongoDB
      await Message.create({ content: msgContent });
      console.log('Message sauvegardé dans MongoDB');
    },
  });
};

run().catch(console.error);