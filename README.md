# TP8: Microservices with Dynamic API Gateway (Kong)

Ce projet illustre l'utilisation de **Kong** en mode **DB-less** comme passerelle d’API dynamique pour gérer deux microservices (`Users` et `Products`) dans un environnement **Dockerisé**. Les services sont développés en **Node.js** et orchestrés avec **Docker Compose**.

---

## 🎯 Objectifs

- Déployer deux microservices REST (`users` et `products`)
- Configurer une API Gateway dynamique avec **Kong**
- Orchestration via **Docker Compose**
- Tester les routes et valider la configuration
- Générer un mini rapport avec captures d’écran

---

## 🧰 Prérequis

- Docker et Docker Compose installés
- Node.js (v22) et npm
- Outils de test : **Curl** ou **Postman**

---

## 📁 Structure du Projet
![image](https://github.com/user-attachments/assets/7155e336-9792-434d-abc1-ad4f764cf3d9)


## ⚙️ Lancer le projet

1. Cloner le dépôt :

bash
git clone https://github.com/imenbenothmenbanani/TP8.git
cd TP8

Lancer les conteneurs avec Docker Compose :
docker compose up --build -d

Vérifier que les services sont bien démarrés :
docker compose ps
---
## 🚀 Tester les microservices via Kong
Une fois les conteneurs démarrés :
1 - Tester le service Users :
curl http://localhost:8000/users

2 - Tester le service Products :
curl http://localhost:8000/products

3 - Vous devriez recevoir des réponses JSON avec des données simulées.
---
🛠️ API d’administration de Kong
Kong expose une API d'administration sur le port 8001.

Lister les services enregistrés :
curl http://localhost:8001/services
---
📄 Fichiers à étudier
service-a/Dockerfile : Construction du service A (Users)

service-b/Dockerfile : Construction du service B (Products)

kong.yml : Définition des routes et services de Kong

docker-compose.yml : Définition des conteneurs et réseau
---
✅ À rendre
Fichiers commentés : Dockerfile, kong.yml, docker-compose.yml

Captures d’écran des résultats curl (/users, /products, /services)

 1 .Lancer les conteneurs avec Docker Compose :
- docker compose up --build -d

2. Vérifier que les services sont bien démarrés :
 - docker compose ps

## 🚀 Tester les microservices via Kong
Une fois les conteneurs démarrés :

Tester le service Users :

curl http://localhost:8000/users
Tester le service Products :

curl http://localhost:8000/products
Vous devriez recevoir des réponses JSON avec des données simulées.

🛠️ API d’administration de Kong
Kong expose une API d'administration sur le port 8001.

** Lister les services enregistrés :
curl http://localhost:8001/services

## 📄 Fichiers à étudier

service-a/Dockerfile : Construction du service A (Users)

service-b/Dockerfile : Construction du service B (Products)

kong.yml : Définition des routes et services de Kong

docker-compose.yml : Définition des conteneurs et réseau

✅ À rendre
Fichiers commentés : Dockerfile, kong.yml, docker-compose.yml

Captures d’écran des résultats curl (/users, /products, /services)

