# ParcAuto

API REST pour une agence de location de voitures, construite avec Node.js et Express. Les données sont stockées en mémoire (pas de base de données) : elles sont réinitialisées à chaque redémarrage du serveur.

## Prérequis

- Node.js 18 ou plus récent
- npm

## Installation

```bash
git clone https://github.com/Selmabd/ParcAuto.git
cd ParcAuto
npm install
```

Crée un fichier `.env` à la racine du projet avec le contenu suivant :

```
PORT=3000
```

## Lancer le serveur

```bash
npm start
```

Le serveur démarre sur `http://localhost:3000`.

## Structure du projet

```
ParcAuto/
├── server.js
├── routes/
│   └── vehicules.js
├── middlewares/
│   └── journal.js
├── .gitignore
└── package.json
```

## Ressource véhicule

| Champ | Description |
|-------|-------------|
| `id` | Attribué par le serveur |
| `marque` | Obligatoire |
| `modele` | Obligatoire |
| `immatriculation` | Obligatoire |
| `disponible` | `true` à la création |

## Routes

| Méthode | URL | Description | Réponses |
|---------|-----|-------------|----------|
| GET | `/vehicules` | Liste les véhicules (`?disponible=true` pour les disponibles seulement) | 200 |
| GET | `/vehicules/:id` | Renvoie un véhicule | 200, 404 |
| POST | `/vehicules` | Crée un véhicule | 201, 400 |
| PATCH | `/vehicules/:id` | Modifie un ou plusieurs champs | 200, 404 |
| DELETE | `/vehicules/:id` | Supprime un véhicule | 204, 404 |

## Exemples

Créer un véhicule :

```http
POST /vehicules
Content-Type: application/json

{
  "marque": "Fiat",
  "modele": "Tipo",
  "immatriculation": "11111-E-2"
}
```

Modifier la disponibilité :

```http
PATCH /vehicules/2
Content-Type: application/json

{ "disponible": true }
```

## Erreurs

Les erreurs sont renvoyées en JSON :

- `{ "erreur": "Véhicule introuvable" }` (404)
- `{ "erreur": "Champs obligatoires manquants" }` (400)
- `{ "erreur": "Route introuvable" }` (404, route inconnue)

## Tests

Toutes les routes ont été testées avec Postman.

## Auteure

Selma ([@Selmabd](https://github.com/Selmabd))