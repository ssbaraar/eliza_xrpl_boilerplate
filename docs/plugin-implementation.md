# 🔧 Implémentation du Plugin

<br/>

Cette section détaille l'implémentation complète du plugin getBalance pour ElizaOS.

<br/>

## Point d'Entrée du plugin (src/index.ts)

```typescript
import { type Plugin } from "@elizaos/core";
import getBalance from "./actions/getBalance";

export const workshop42BlockchainPlugin: Plugin = {
    name: "@elizaos-plugins/plugin-workshop-42blockchain",
    description: "Plugin de démonstration pour le workshop 42 Blockchain",
    actions: [getBalance], // Action que l'on vas creer ensemble.
    providers: [],
    evaluators: [],
    services: [],
    clients: [],
    adapters: []
};

export { workshop42BlockchainPlugin as default };
```

<br/>

## 📂 Structure Détaillée

<br/>

L'implémentation est divisée en plusieurs composants interconnectés :

<br/>

[📁 Reour au details de la structure du plugin au besoin](https://github.com/MathysCogne/workshop_elizaos_42blockchain/blob/ex/docs/project-structure.md)

<br/>

Acceder a chaque sous tuto:

<br/>

1. [🎯 Action getBalance](./implementation/action.md)
   - Structure complète de l'action
   - Validation des entrées
   - Gestion des erreurs
   - Handler principal

2. [🎮 Service API XRP](./implementation/service.md)
   - Configuration de l'API
   - Appels au réseau XRP
   - Gestion des réponses
   - Conversion des unités

3. [📝 Templates de Réponse](./implementation/templates.md)
   - Structure des templates
   - Variables dynamiques
   - Styles de réponse
   - Intégration avec le LLM

4. [📚 Exemples d'Utilisation](./implementation/examples.md)
   - Configuration des exemples
   - Styles de communication
   - Variables dynamiques
   - Patterns de reconnaissance

<br/>

## 🔄 Flux d'Exécution

1. L'utilisateur envoie une requête contenant une adresse XRP
2. L'action `getBalance` valide l'adresse
3. Le service API interroge le réseau XRP
4. Les données sont formatées via les templates
5. Une réponse naturelle est générée et envoyée

<br/>

## 📦 Code Source

Le code source complet est disponible dans le dossier `packages/plugin-workshop-42blockchain/src/` :
- `actions/getBalance.ts`
- `services/getBalanceService.ts`
- `templates/index.ts`
- `examples/getBalanceExamples.ts`

Pour plus de détails sur chaque composant, consultez les sections correspondantes ci-dessus.

<br/>


## Prochaines Étapes

- [🧪 Test et Déploiement](./testing-deployment.md)
- [🎭 Retour à la Configuration du Character](./character-config.md)
- [📁 Retour à la Structure du Projet](./project-structure.md) 
