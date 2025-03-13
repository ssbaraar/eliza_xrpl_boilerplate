# 🚀 Démarrage Rapide

## Prérequis

Avant de commencer ce workshop, assurez-vous d'avoir installé :

- **Node.js** (version 16 ou supérieure)
- **pnpm** (gestionnaire de paquets plus rapide et plus efficace que npm)
- **TypeScript** (connaissance de base requise)
- **Git** (pour la gestion du code source)

## Installation

1. **Clonez le repository**
```bash
git clone https://github.com/votre-username/plugin-workshop-42blockchain.git
cd plugin-workshop-42blockchain
```

2. **Installez les dépendances**
```bash
pnpm install --no-frozen-lockfile
```

3. **Linkez votre plugin**
```bash
pnpm link [votre-plugin]
```

## Premier Lancement

1. **Build du projet**
```bash
pnpm build
```

2. **Démarrage du client web**
```bash
pnpm start:client
```

3. **Démarrage de l'agent**
```bash
pnpm start --character="characters/workshop.character.json"
```

## Vérification de l'Installation

Pour vérifier que tout fonctionne correctement, essayez cette commande dans l'interface :
```
Quel est le solde du wallet rNZ2ZVF1ZU34kFQvcN4xkFAvdSvve5bXce?
```

Vous devriez recevoir une réponse contenant le solde du wallet.

## Prochaines Étapes

- [📁 Découvrez la structure du projet](./project-structure.md)
- [🎭 Configurez votre character](./character-config.md)
- [🔧 Implémentez votre premier plugin](./plugin-implementation.md) 