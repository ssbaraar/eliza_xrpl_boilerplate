# 🎮 Service API XRP

<br />

📂 [Voir le code source](../../packages/plugin-workshop-42blockchain/src/services/getBalanceService.ts)

Ce document détaille l'implémentation du service qui interagit avec l'API XRP Ledger.

<br />

## Configuration de Base

```typescript
const BASE_URL = "https://s1.ripple.com:51234";
```

<br />

## Implémentation du Service

```typescript
export async function getBalanceService(address: string): Promise<string> {
    const url = `${BASE_URL}`;
    
    const requestBody = {
        method: 'account_info',
        params: [
            {
                account: address,
                strict: true,
                ledger_index: 'current',
                queue: true
            }
        ],
        id: 1
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`);
    }

    const data = await response.json();
    
    if (data.error || data.result?.error) {
        const errorMessage = data.error_message || data.error || data.result?.error;
        console.error("API Error:", errorMessage);
        throw new Error(errorMessage);
    }

    // Conversion drops -> XRP (1 XRP = 1,000,000 drops)
    const xrpBalance = Number(data.result.account_data.Balance) / 1000000;
    console.log("XRP Balance:", xrpBalance);

    return xrpBalance.toString();
}
```

<br />

## Détails de l'Implémentation

### 1. Construction de la Requête

```typescript
const requestBody = {
    method: 'account_info',
    params: [
        {
            account: address,    // Adresse XRP à vérifier
            strict: true,        // Validation stricte de l'adresse
            ledger_index: 'current', // Utilise le ledger le plus récent
            queue: true         // Inclut les transactions en attente
        }
    ],
    id: 1
};
```

<br />

### 2. Appel API

```typescript
const response = await fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody)
});
```

- Utilise `fetch` pour l'appel HTTP
- Méthode POST requise pour l'API XRP Ledger
- Headers appropriés pour JSON

<br />



### 4. Conversion du Solde

```typescript
const xrpBalance = Number(data.result.account_data.Balance) / 1000000;
```

- L'API retourne le solde en "drops"
- 1 XRP = 1,000,000 drops
- Conversion automatique pour l'affichage

<br />

## Utilisation dans l'Action

Le service est utilisé dans [l'action getBalance](./action.md) :

```typescript
const xrpBalance = await getBalanceService(address);
state.balance = xrpBalance;
```

<br />

## Liens Connexes

- [📚 Exemples d'Utilisation](./examples.md)

<br />

- [🎯 🔙 Retour à Action getBalance](./action.md)
- [📝 🔙 Retour à Configuration des Templates](./templates.md)
- [🔙 Retour à l'Implémentation Principale](../plugin-implementation.md) 
