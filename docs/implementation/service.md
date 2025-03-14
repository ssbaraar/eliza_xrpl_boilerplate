# 🎮 Service API XRP

📂 [Voir le code source](../../packages/plugin-workshop-42blockchain/src/services/getBalanceService.ts)

Ce document détaille l'implémentation du service qui interagit avec l'API XRP Ledger.

## Configuration de Base

```typescript
const BASE_URL = "https://s1.ripple.com:51234";
```

Le service utilise l'API officielle XRP Ledger au lieu de XRPScan pour une meilleure fiabilité.

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

#### Paramètres Importants
- `method: 'account_info'` - Méthode RPC pour obtenir les informations du compte
- `strict: true` - Assure une validation stricte de l'adresse
- `ledger_index: 'current'` - Utilise toujours le dernier état du ledger
- `queue: true` - Inclut les transactions en attente dans la réponse

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

### 3. Validation de la Réponse

```typescript
if (!response.ok) {
    throw new Error(`Erreur HTTP ${response.status}`);
}

const data = await response.json();

if (data.error || data.result?.error) {
    const errorMessage = data.error_message || data.error || data.result?.error;
    console.error("API Error:", errorMessage);
    throw new Error(errorMessage);
}
```

- Vérifie le statut HTTP
- Parse la réponse JSON
- Gère les erreurs spécifiques à l'API XRP

### 4. Conversion du Solde

```typescript
const xrpBalance = Number(data.result.account_data.Balance) / 1000000;
```

- L'API retourne le solde en "drops"
- 1 XRP = 1,000,000 drops
- Conversion automatique pour l'affichage

## Gestion des Erreurs

Le service gère plusieurs types d'erreurs :

1. **Erreurs HTTP**
   ```typescript
   if (!response.ok) {
       throw new Error(`Erreur HTTP ${response.status}`);
   }
   ```

2. **Erreurs API**
   ```typescript
   if (data.error || data.result?.error) {
       const errorMessage = data.error_message || data.error || data.result?.error;
       throw new Error(errorMessage);
   }
   ```

3. **Erreurs de Parsing**
   - Utilisation de try/catch dans [l'action principale](./action.md)
   - Logging approprié des erreurs

## Bonnes Pratiques

1. **Validation**
   - Validation de l'adresse avant l'appel
   - Vérification des réponses API

2. **Conversion**
   - Conversion automatique drops -> XRP
   - Format string pour éviter les problèmes de précision

3. **Logging**
   - Console.log pour le debugging
   - Messages d'erreur clairs

## Utilisation dans l'Action

Le service est utilisé dans [l'action getBalance](./action.md) :

```typescript
const xrpBalance = await getBalanceService(address);
state.balance = xrpBalance;
```

## Liens Connexes

- [📚 Exemples d'Utilisation](./examples.md)


- [🎯 🔙 Retour à Action getBalance](./action.md)
- [📝 🔙 Retour à Configuration des Templates](./templates.md)
- [🔙 Retour à l'Implémentation Principale](../plugin-implementation.md) 
