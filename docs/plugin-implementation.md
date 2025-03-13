# 🔧 Implémentation du Plugin

Cette section détaille l'implémentation complète du plugin getBalance pour ElizaOS.

## 📂 Structure Détaillée

L'implémentation est divisée en plusieurs composants interconnectés :

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

## 🔄 Flux d'Exécution

1. L'utilisateur envoie une requête contenant une adresse XRP
2. L'action `getBalance` valide l'adresse
3. Le service API interroge le réseau XRP
4. Les données sont formatées via les templates
5. Une réponse naturelle est générée et envoyée

## 📦 Code Source

Le code source complet est disponible dans le dossier `packages/plugin-workshop-42blockchain/src/` :
- `actions/getBalance.ts`
- `services/getBalanceService.ts`
- `templates/index.ts`
- `examples/getBalanceExamples.ts`

Pour plus de détails sur chaque composant, consultez les sections correspondantes ci-dessus.

## Point d'Entrée (src/index.ts)

```typescript
import { type Plugin } from "@elizaos/core";
import getBalance from "./actions/getBalance";

export const workshop42BlockchainPlugin: Plugin = {
    name: "@elizaos-plugins/plugin-workshop-42blockchain",
    description: "Plugin de démonstration pour le workshop 42 Blockchain",
    actions: [getBalance],
    providers: [],
    evaluators: [],
    services: [],
    clients: [],
    adapters: []
};

export { workshop42BlockchainPlugin as default };
```

## Action de Balance (src/actions/getBalance.ts)

### Structure de l'Action
```typescript
export const getBalance: Action = {
    name: "GET_BALANCE",
    similes: [
        "CHECK_BALANCE",
        "SHOW_BALANCE",
        "BALANCE",
        "SOLDE",
        "VOIR_SOLDE",
        "MONTRER_SOLDE"
    ],
    description: "Récupère et affiche le solde XRP d'une adresse donnée",
    validate: async (runtime, message) => {
        // Validation de l'adresse XRP
    },
    handler: async (runtime, message, state, options, callback) => {
        // Traitement de la requête
    },
    examples: getBalanceExamples
};
```

### Validation de l'Adresse
```typescript
validate: async (runtime: IAgentRuntime, message: Memory) => {
    const text = message.content.text || '';
    const addressMatch = text.match(/r[A-Za-z0-9]{24,34}/i);
    return !!addressMatch;
}
```

### Handler Principal
```typescript
handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    state: State,
    _options: { [key: string]: unknown },
    callback: HandlerCallback
) => {
    try {
        // Extraction de l'adresse
        const address = message.content.text.match(/r[A-Za-z0-9]{24,34}/i)[0];
        
        // Récupération du solde
        const balance = await getBalanceService(address);
        
        // Mise à jour du state
        state.address = address;
        state.balance = balance;
        state.currency = "XRP";
        
        // Génération de la réponse
        const response = await generateResponse(runtime, state);
        
        // Envoi de la réponse
        callback({
            text: response,
            inReplyTo: message.id
        });
        
        return true;
    } catch (error) {
        // Gestion des erreurs
        return false;
    }
}
```

## Service API (src/services/getBalanceService.ts)

```typescript
export const getBalanceService = async (address: string) => {
    const response = await fetch(`https://api.xrpscan.com/api/v1/account/${address}`);
    const data = await response.json();
    return data.xrpBalance;
};
```

## Template de Réponse (src/templates/index.ts)

```typescript
export const formatBalanceTemplate = `
Tu es un assistant qui aide à présenter le solde d'un portefeuille XRP.

Contexte:
- Adresse: {{address}}
- Solde: {{balance}} {{currency}}

Génère une réponse naturelle et professionnelle qui présente ce solde.
Ne rajoute pas d'informations supplémentaires, reste factuel.
`;
```

## Exemples d'Utilisation (src/examples/getBalanceExamples.ts)

```typescript
export const getBalanceExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: { 
                text: "Quel est le solde du wallet rNZ2ZVF1ZU34kFQvcN4xkFAvdSvve5bXce?"
            }
        },
        {
            user: "{{agent}}",
            content: {
                text: "Je vérifie le solde de ce wallet...",
                action: "GET_BALANCE"
            }
        }
    ]
];
```

## Points Clés à Retenir

1. **Validation**
   - Vérifiez toujours la validité des entrées
   - Utilisez des regex pour la validation d'adresse

2. **Gestion d'Erreurs**
   - Implémentez une gestion d'erreurs robuste
   - Fournissez des messages d'erreur clairs

3. **State Management**
   - Utilisez le state pour le contexte
   - Mettez à jour le state de manière cohérente

4. **Templates**
   - Gardez les templates simples et clairs
   - Utilisez des variables pour la personnalisation

## Prochaines Étapes

- [🧪 Test et Déploiement](./testing-deployment.md)
- [🎭 Retour à la Configuration du Character](./character-config.md)
- [📁 Retour à la Structure du Projet](./project-structure.md) 