# TP6 : Intégration et Manipulation de Données avec Apache Kafka

## 📚 Objectif

Ce TP vise à :
- Acquérir des compétences pratiques dans la gestion des flux de données avec **Apache Kafka**.
- Intégrer **Kafka** avec une application **Node.js** pour produire et consommer des messages.
- Stocker les messages dans une base de données (MongoDB ou PostgreSQL).
- Exposer les données via une API REST en **Express.js**.

---

## 🛠️ Outils Utilisés

- [Apache Kafka 3.9.0](https://kafka.apache.org/downloads)
- Zookeeper
- Node.js (via [nodejs.org](https://nodejs.org/en/download))
- KafkaJS
- MongoDB ou PostgreSQL
- Express.js

---

## 🧩 Étapes de Réalisation

### 1. Installation et Préparation

#### Kafka & Zookeeper
- Télécharger et extraire Kafka 3.9.0.
- Démarrer Zookeeper :
  ```bash
  bin/zookeeper-server-start.sh config/zookeeper.properties

#####  Démarrer Kafka :
bin/kafka-server-start.sh config/server.properties
#### Node.js
Installer Node.js : sudo snap install node --classic

#### 2. Création du Topic Kafka
bin/kafka-topics.sh --create --partitions 1 --replication-factor 1 --topic test-topic --bootstrap-server localhost:9092

#### 3. Projet Node.js
Initialisation : npm init -y
npm install kafkajs express mongoose  # ou pg selon la base choisie

#### 4. Producteur Kafka (producer.js)
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer();

const run = async () => {
  await producer.connect();
  setInterval(async () => {
    await producer.send({
      topic: 'test-topic',
      messages: [{ value: 'Hello KafkaJS user!' }],
    });
    console.log("Message envoyé !");
  }, 1000);
};

run().catch(console.error);

#### 5. Consommateur Kafka (consumer.js)
Ajoutez une base de données pour stocker les messages :
const { Kafka } = require('kafkajs');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/kafkaDB', { useNewUrlParser: true, useUnifiedTopology: true });

const Message = mongoose.model('Message', { value: String });

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'test-group' });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const msg = new Message({ value: message.value.toString() });
      await msg.save();
      console.log("Message enregistré :", msg);
    },
  });
};

run().catch(console.error);

#### 6. API REST avec Express (server.js)
const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27017/kafkaDB', { useNewUrlParser: true, useUnifiedTopology: true });

const Message = mongoose.model('Message', { value: String });

app.get('/messages', async (req, res) => {
  const messages = await Message.find();
  res.json(messages);
});

app.listen(3000, () => {
  console.log("Serveur API sur http://localhost:3000");
});

✅ Tests
1. Exécutez Kafka et Zookeeper.

2. Lancez node producer.js.

3. Lancez node consumer.js.

4. Démarrez l’API avec node server.js.

5. Vérifiez les messages via http://localhost:3000/messages.

