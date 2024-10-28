# Micro-Service Project

## Description

Ce projet est une architecture basée sur des microservices incluant `user-service`, `time-service`, `front-service` et `api-gateway`. Chaque service gère des fonctionnalités spécifiques et communique avec les autres pour former une application cohérente.

## Services

### User Service

- **Chemin**: `user-service`
- **Description**: Gère les opérations utilisateur comme l'inscription, la connexion et la suppression.
- **Fichier Principal**: `src/app.ts`
- **Dépendances**: `bcrypt`, `express`, `jsonwebtoken`, `mongoose`, `react`, `react-dom`

### Time Service

- **Chemin**: `time-service`
- **Description**: Gère les opérations liées au temps.
- **Fichier Principal**: `src/app.ts`
- **Dépendances**: `express`, `mongoose`

### Front Service

- **Chemin**: `front-service`
- **Description**: Service frontend construit avec React et Vite.
- **Fichier Principal**: `index.html`
- **Dépendances**: `react`, `react-dom`, `vite`

### API Gateway

- **Chemin**: `api-gateway`
- **Description**: Sert de passerelle pour router les requêtes vers les services appropriés.
- **Fichier Principal**: `src/app.js`
- **Dépendances**: `express`, `cors`, `jsonwebtoken`, `mongoose`, `swagger-jsdoc`, `swagger-ui-express`

## Prérequis

- Node.js
- npm ou yarn

## Installation

1. Cloner le dépôt:

```sh
git clone <repository-url>
```

2. Installer les dépendances pour chaque service:

```sh
cd user-service
npm install
cd ../time-service
npm install
cd ../front-service
npm install
cd ../api-gateway
npm install
```

## Exécution des Services

1. Démarrer le User Service:

```sh
cd user-service
npm run dev
```

2. Démarrer le Time Service:

```sh
cd time-service
npm run dev
```

3. Démarrer le Front Service:

```sh
cd front-service
npm run dev
```

4. Démarrer l'API Gateway:

```sh
cd api-gateway
npm start
```

## Contribuer

Les contributions sont les bienvenues! Veuillez ouvrir une issue ou soumettre une pull request pour toute modification.

## Licence

Ce projet est sous licence ISC.

## Contact

Pour toute question, veuillez contacter les mainteneurs du projet.
