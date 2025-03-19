# 🚀 Projet gRPC en Node.js

Ce projet est une implémentation d'un serveur gRPC en Node.js avec Protobuf.

## ✅ Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants :

- **📦 Protobuf** : [Télécharger ici](https://protobuf.dev/downloads/)
  - Sur Ubuntu :
    ```sh
    sudo snap install protobuf --classic
    ```
- **🖥️ Node.js** : [Télécharger ici](https://nodejs.org/en/download)
  - Sur Ubuntu :
    ```sh
    sudo snap install node --classic
    ```

## 📥 Installation du projet

1. 🛠️ Clonez ce repository :

   ```sh
   git clone https://github.com/Imenbenothmenbanani/Tps_SOA.git
   cd TP4
   ```

2. 📌 Initialisez un projet Node.js :

   ```sh
   npm init -y
   ```

3. 📦 Installez les dépendances nécessaires :
   ```sh
   npm install @grpc/grpc-js @grpc/proto-loader
   ```

## ▶️ Démarrer le serveur gRPC

Lancez le serveur avec la commande suivante :

```sh
node server.js
```

Vous devriez voir le message suivant :

```
gRPC Server running on port 50051
```

## 🛠️ Test avec Postman

1. 📌 Ouvrir Postman et créer une nouvelle requête **gRPC Request**.
2. 🔗 Définir `localhost:50051` comme hôte.
3. 📂 Importer `hello.proto`.
4. 📢 Sélectionner le service **Greeter** et la méthode **SayHello**.
5. 📤 Envoyer un JSON comme :
   
   ```json
   { "name": "TestUser" }
   ```
7. ✅ Vous devriez recevoir une réponse :
   ```json
   { "message": "Hello, TestUser!" }
   ```