# Quadriva
Spotify music quiz

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

[Download Node.js v8 or above](https://github.com/nodejs/node#download)

### Installing

Clone the repo

```bash
git clone git@github.com:synthesists/quadrivia.git
```

Install dependencies

```bash
npm install
```

### Run the app

```bash
npm run build

firebase serve
```

The app will be running at `http://localhost:5000`.

Alternatively, you can run `npm start` from
- `/client` to start only the client
- `/functions` to start only the functions

## Deploying the app

### To IBM Cloud Foundry (for accessing the client site on any internet device connected to the internet)

1. Set up your [Google Firebase](https://firebase.google.com/) account.
2. `npm run deploy:cloud`
