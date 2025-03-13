# 📚 Exemples d'Utilisation

📂 [Voir le code source](../../packages/plugin-workshop-42blockchain/src/examples/getBalanceExamples.ts)

Ce document détaille la configuration des exemples qui guident le comportement de l'agent.

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

## Styles de Communication

### 1. Style Décontracté
```typescript
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
```

### 2. Style Direct
```typescript
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
```

### 3. Style Poli
```typescript
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
```

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

## Personnalisation des Exemples

### 1. Variation du Langage
- Utilisez différents niveaux de langage
- Incluez des expressions courantes
- Ajoutez des emojis pour le style décontracté

### 2. Formats d'Adresse
- Montrez différentes façons de demander un solde
- Variez la position de l'adresse dans la phrase
- Incluez des variations de syntaxe

### 3. Contexte
- Ajoutez des exemples avec du contexte
- Montrez des variations de questions
- Incluez des cas d'erreur

## Intégration avec l'Action

Les exemples sont utilisés dans [l'action getBalance](./action.md) :

```typescript
export const getBalance: Action = {
    // ...
    examples: getBalanceExamples as ActionExample[][],
    // ...
};
```

## Bonnes Pratiques

1. **Diversité**
   - Incluez différents styles de langage
   - Couvrez divers cas d'utilisation
   - Variez les formulations

2. **Cohérence**
   - Gardez un style cohérent par exemple
   - Assurez-vous que les réponses sont appropriées
   - Maintenez la personnalité de l'agent

3. **Maintenance**
   - Mettez à jour les exemples régulièrement
   - Ajoutez de nouveaux cas d'utilisation
   - Affinez les réponses basées sur les retours

## Liens Connexes

- [🎯 Action getBalance](./action.md)
- [📝 Templates de Réponse](./templates.md)
- [🔙 Retour à l'Implémentation Principale](../plugin-implementation.md) 