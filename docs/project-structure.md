# 📁 Découvrez la structure du plugin

<br/>

## Architecture du Plugin

Voici l'architecture type d'un plugin ElizaOS :

```
plugin-workshop-42blockchain/
├── package.json
├── tsconfig.json
├── tsup.config.ts
└── src/
    ├── services/         # Services API
    ├── actions/          # Actions du plugin
    ├── examples/         # Exemples d'utilisation
    ├── templates/        # Templates de réponse
    ├── index.ts         # Point d'entrée du plugin
    ├── types.ts         # Définitions de types
    └── environment.ts   # Configuration d'environnement
```

<br/>

## Configuration TypeScript

### tsconfig.json
```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src"]
}
```

### tsup.config.ts
```typescript
import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts"],
    format: ["cjs", "esm"],
    dts: true,
});
```

<br/>

## Organisation des Fichiers

### 1. Services (src/services/)
- Contient les services qui interagissent avec les APIs externes
- Exemple : `getBalanceService.ts` pour l'API XRP

### 2. Actions (src/actions/)
- Définit les actions disponibles dans votre plugin
- Exemple : `getBalance.ts` pour vérifier le solde

### 3. Examples (src/examples/)
- Contient les exemples d'utilisation pour l'entraînement de l'agent
- Aide à définir le comportement attendu

### 4. Templates (src/templates/)
- Définit les templates de réponse pour le LLM
- Permet de personnaliser les réponses de l'agent

### 5. Point d'Entrée (src/index.ts)
- Configure et exporte le plugin
- Déclare les actions, services et autres composants

<br/>

## Prochaines Étapes

- [🎭 Configuration du Character](./character-config.md)
- [🔧 Implémentation du Plugin](./plugin-implementation.md)
- [🧪 Test et Déploiement](./testing-deployment.md)

<br/>

- [🔙 Retour à la racine](../../) 
