# TP7 : Microservices avec REST, GraphQL, gRPC et Kafka
Ce projet illustre une architecture moderne basée sur les microservices, en combinant plusieurs technologies pour une communication inter-services efficace, une exposition d’API flexible, et une gestion d’événements asynchrone.
Il met en œuvre deux microservices indépendants — films et séries TV — qui communiquent via gRPC, tandis qu’une API Gateway centralise les accès via des endpoints RESTful et GraphQL.
L’intégration d’Apache Kafka permet de gérer la production et la consommation d’événements liés à la création de contenus multimédias, assurant ainsi une architecture réactive et scalable.

Ce TP a pour but de vous familiariser avec l’écosystème des microservices, tout en explorant l’usage combiné de Node.js, gRPC, GraphQL, et Kafka dans une même solution.
---

## 🎯 Objectifs du TP

- Développer deux microservices distincts : **films** et **séries TV**
- Utiliser **gRPC** pour la communication entre microservices
- Mettre en place une **API Gateway** qui expose des endpoints **RESTful** et **GraphQL**
- Intégrer **Apache Kafka** pour une communication asynchrone fiable

---

## 🧰 Technologies et outils utilisés

- Node.js / Express
- gRPC / Protocol Buffers
- Apollo Server (GraphQL)
- Kafka & KafkaJS
- CORS / Body-parser

---

## 🗂️ Structure du Projet
![image](https://github.com/user-attachments/assets/ea345647-2b6d-4b7e-9e37-27592ad9d1a8)


---

## 🔧 Installation et démarrage

### 1. Installer Node.js  
→ [https://nodejs.org](https://nodejs.org)

### 2. Installer Kafka & Zookeeper  
→ [https://kafka.apache.org/downloads](https://kafka.apache.org/downloads)

### 3. Installer les dépendances :

npm install express @apollo/server @grpc/grpc-js @grpc/proto-loader body-parser cors kafkajs
---
 ### 4. Démarrer les services (dans cet ordre) :
- node movieMicroservice.js
- node tvShowMicroservice.js
- node apiGateway.js
---
### ⚙️ API Gateway - Fonctionnalités
Endpoints REST :

GET /movies → liste des films

GET /movies/:id → détails d’un film

GET /tvshows → liste des séries TV

GET /tvshows/:id → détails d’une série TV

POST /movies → création d’un film (Kafka)

POST /tvshows → création d’une série TV (Kafka)

Endpoint GraphQL :

URL : http://localhost:3000/graphql

Exemple de requête :
{
  movies {
    id
    title
    description
  }
}
🧬 Schéma GraphQL
type Movie {
  id: String!
  title: String!
  description: String!
}

type TVShow {
  id: String!
  title: String!
  description: String!
}

type Query {
  movie(id: String!): Movie
  movies: [Movie]
  tvShow(id: String!): TVShow
  tvShows: [TVShow]
}
🔁 Kafka
Producteurs dans apiGateway.js : publient des messages lors de création

Consommateurs dans les microservices : écoutent les événements
Topics utilisés :
      movies_topic
      tvshows_topic
---
### Exemple de création de topic :
kafka-topics --create --topic movies_topic --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
----
✅ À tester
Lancer les 3 services (films, séries, gateway)

Vérifier les endpoints REST :

curl http://localhost:3000/movies

curl http://localhost:3000/tvshows

---
### Tester GraphQL avec Apollo Studio ou Postman
Vérifier les messages Kafka (avec UI comme Kafdrop ou kafka-console-consumer)

📝 À améliorer
Connexion à une base de données (MongoDB, PostgreSQL, etc.)
Ajout des opérations update et delete
Gestion d’erreurs centralisée



