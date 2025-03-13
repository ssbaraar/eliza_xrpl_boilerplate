# 🎯 Implémentation de l'Action getBalance

<br/>

📂 [Voir le code source](../../packages/plugin-workshop-42blockchain/src/actions/getBalance.ts)

<br/>

Ce document détaille l'implémentation de l'action `getBalance` qui est le cœur de notre plugin.

<br/>

## Importation

```typescript
import {
    elizaLogger,
    Action,
    ActionExample,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    State,
    ModelClass,
    generateText,
    composeContext,
    stringToUuid
} from "@elizaos/core";
```

<br/>

## Composants Interconnectés

L'action utilise plusieurs composants qui travaillent ensemble :

- [🎮 Service API](./service.md) - Gère les appels à l'API XRP
- [📝 Templates](./templates.md) - Définit le format des réponses
- [📚 Exemples](./examples.md) - Configure le comportement de l'agent

<br/>

## Configuration de l'Action

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
    description: "Récupère et affiche le solde XRP d'une adresse donnée sur le réseau Ripple"
};
```

### Similes
Les similes sont des mots-clés alternatifs qui peuvent déclencher l'action. Ils permettent à l'agent de reconnaître différentes formulations de la même demande.

<br/>

## Validation

Permet de valider que l'action peut être exécutée normalement.
Ici on a décidé de mettre un REGEX pour valider l'addr wallet, mais on aurait pu mettre beaucoup plus de choses (Validation de mots clefs, var d'environnement...).

```typescript
validate: async (runtime: IAgentRuntime, message: Memory) => {
    const text = message.content.text || '';
    const addressMatch = text.match(/r[A-Za-z0-9]{24,34}/i);
    return !!addressMatch;
}
```

La fonction `validate` :
- Vérifie si le message contient une adresse XRP valide
- Utilise une regex pour valider le format : `r[A-Za-z0-9]{24,34}`
- Retourne `true` uniquement si une adresse valide est trouvée

<br/>

## Handler Principal

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
        const text = message.content.text || '';
        const addressMatch = text.match(/r[A-Za-z0-9]{24,34}/i);
        if (!addressMatch) return false;
        
        const address = addressMatch[0];
        console.log(`Recherche du solde pour l'adresse: ${address}`);

        // Appel au service API
        const xrpBalance = await getBalanceService(address);
        console.log(`Solde récupéré avec succès pour ${address}`);

        // Mise à jour du state
        state.address = address;
        state.balance = xrpBalance;
        state.currency = "XRP";

        // Génération de la réponse
        const context = composeContext({
            state,
            template: formatBalanceTemplate
        });

        const formattedResponse = await generateText({
            runtime,
            context,
            modelClass: ModelClass.SMALL
        });

        // Gestion du contexte de conversation
        await runtime.messageManager.createMemory({
            id: stringToUuid(Date.now().toString()),
            content: { text: formattedResponse },
            userId: runtime.agentId,
            roomId: message.roomId,
            agentId: runtime.agentId
        });

        // Envoi de la réponse
        if (callback) {
            callback({
                text: formattedResponse,
                inReplyTo: message.id
            });
        }

        return true;

    } catch (error: any) {
        elizaLogger.error("Erreur dans le handler du plugin XRP:", error);
        if (callback) {
            callback({
                text: `Une erreur est survenue lors de la récupération du solde. Veuillez réessayer plus tard.`
            });
        }
        return false;
    }
}
```

<br/>

### Étapes Détaillées du Handler

1. **Extraction de l'Adresse**
   - Utilise la même regex que la validation
   - Extrait l'adresse XRP du message

2. **[Appel au Service API](./service.md)**
   - Utilise `getBalanceService` pour récupérer le solde
   - Gère les erreurs potentielles de l'API

3. **Gestion du State**
   - Met à jour le state avec :
     - L'adresse du wallet
     - Le solde récupéré
     - La devise (XRP)
   - Le state est utilisé pour [le template de réponse](./templates.md)

4. **Génération de la Réponse**
   - Utilise `composeContext` pour préparer les données
   - Appelle `generateText` avec le contexte
   - Utilise `ModelClass.SMALL` pour une réponse rapide

5. **Gestion du Contexte**
   - Crée une mémoire pour maintenir le contexte
   - Permet à l'agent de se souvenir de la conversation

6. **Envoi de la Réponse**
   - Utilise le callback pour envoyer la réponse
   - Lie la réponse au message original avec `inReplyTo`

<br/>

## Liens Connexes

- [📝 Configuration des Templates](./templates.md)
- [🎮 Service API XRP](./service.md)
- [📚 Exemples d'Utilisation](./examples.md)
- [🔙 Retour à l'Implémentation Principale](../plugin-implementation.md) 
