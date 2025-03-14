# 📚 Exemples d'Utilisation

<br/>

Ce document détaille la configuration des exemples qui guident le comportement de l'agent.


📂 [Voir le code source](../../packages/plugin-workshop-42blockchain/src/examples/getBalanceExamples.ts)

<br/>

## Structure des Exemples

```typescript
import { ActionExample } from "@elizaos/core";

export const getBalanceExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: { text: "Yo Bob, tu peux checker le wallet rNZ2ZVF1ZU34kFQvcN4xkFAvdSvve5bXce ?" }
        },
        {
            user: "{{agent}}",
            content: { 
                text: "Yes mon pote ! Je regarde ce que ce wallet a dans le ventre ! 🚀",
                action: "GET_BALANCE"
            }
        }
    ],
    [
        {
            user: "{{user1}}",
            content: { text: "Combien de XRP a rNZ2ZVF1ZU34kFQvcN4xkFAvdSvve5bXce ?" }
        },
        {
            user: "{{agent}}",
            content: { 
                text: "Je check ça direct frérot, on va voir combien de XRP il y a là-dedans ! 😎",
                action: "GET_BALANCE"
            }
        }
    ],
    [
        {
            user: "{{user1}}",
            content: { text: "Quel est le solde de rNZ2ZVF1ZU34kFQvcN4xkFAvdSvve5bXce stp" }
        },
        {
            user: "{{agent}}",
            content: { 
                text: "Carrément ! Je jette un œil aux XRP de ce wallet, deux secondes ! 🔥",
                action: "GET_BALANCE"
            }
        }
    ]
];
```

<br/>

## Anatomie d'un Exemple

### 1. Structure de Base

```typescript
[
    {
        user: "{{user1}}",     // Message de l'utilisateur
        content: { text: "..." }
    },
    {
        user: "{{agent}}",     // Réponse de l'agent
        content: { 
            text: "...",
            action: "GET_BALANCE"
        }
    }
]
```

Chaque exemple est un tableau contenant :
1. Le message de l'utilisateur
2. La réponse attendue de l'agent

### 2. Variables Dynamiques

- `{{user1}}` : Représente l'utilisateur
- `{{agent}}` : Représente l'agent
- Ces variables sont remplacées dynamiquement lors de l'exécution


<br/>

## Impact sur le Comportement

### 1. Reconnaissance des Patterns
- Les exemples aident l'agent à reconnaître différentes formulations
- Plus il y a d'exemples variés, meilleure est la reconnaissance

### 2. Style de Réponse
- Les réponses de l'agent sont influencées par les exemples
- Le ton et le style sont adaptés au contexte

### 3. Action Trigger
- Chaque exemple montre quand déclencher l'action `GET_BALANCE`
- L'agent apprend à identifier les requêtes pertinentes

<br/>

## Intégration avec l'Action

Les exemples sont utilisés dans [l'action getBalance](./action.md) :

```typescript
export const getBalance: Action = {
    // ...
    examples: getBalanceExamples as ActionExample[][],
    // ...
};
```

<br/>



## Liens Connexes

- [🎯 🔙 Retour à Action getBalance](./action.md)
- [📝 🔙 Retour à Templates de Réponse](./templates.md)
- [🔙 Retour à l'Implémentation Principale](../plugin-implementation.md) 
