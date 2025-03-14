# 📝 Templates de Réponse

<br/>


Ce document détaille la configuration et l'utilisation des templates pour générer des réponses naturelles.


📂 [Voir le code source](../../packages/plugin-workshop-42blockchain/src/examples/getBalanceExamples.ts)

<br/>

## Structure du Template

```typescript
export const formatBalanceTemplate = `
Contexte:
- Adresse du portefeuille: {{address}}
- Solde: {{balance}} {{currency}}

Ne rajoute pas d'informations supplémentaires, reste factuel.

Changer la tournure de cette exemple pour que ce soit plus naturel et aléatoire.

Ta réponse devra ressembler à ceci:
Ce wallet a {{balance}} {{currency}}.

ou

D'après ce que j'ai trouvé sur l'explorateur, {{address}} a {{balance}} {{currency}}.
`;
```

<br/>

## Variables Dynamiques

### 1. Variables de State
```typescript
state.address = address;      // Adresse XRP
state.balance = xrpBalance;   // Solde en XRP
state.currency = "XRP";       // Devise
```

Ces variables sont injectées dans le template via :
```typescript
{{address}} -> state.address
{{balance}} -> state.balance
{{currency}} -> state.currency
```

<br/>

## Intégration avec l'Action

### 1. Composition du Contexte
```typescript
const context = composeContext({
    state,                    // Injection du state
    template: formatBalanceTemplate  // Notre template
});
```

### 2. Génération de la Réponse
```typescript
const formattedResponse = await generateText({
    runtime,
    context,
    modelClass: ModelClass.SMALL
});
```

<br/>

## Fonctionnement Détaillé

### 1. Préparation du Contexte

```typescript
// Dans l'action getBalance
state.address = address;
state.balance = xrpBalance;
state.currency = "XRP";

const context = composeContext({
    state,
    template: formatBalanceTemplate
});
```

La fonction `composeContext` :
- Fusionne le state avec le template
- Remplace les variables par leurs valeurs
- Prépare le contexte pour le LLM

### 2. Génération de Texte

```typescript
const formattedResponse = await generateText({
    runtime,
    context,
    modelClass: ModelClass.SMALL
});
```

Le processus de génération :
1. Utilise le contexte préparé
2. Applique les instructions du template
3. Génère une réponse naturelle
4. Utilise `ModelClass.SMALL` pour l'efficacité


<br/>

## Intégration avec les Exemples

Les templates doivent être cohérents avec [les exemples](./examples.md) :
- Style de langage similaire
- Ton approprié
- Format de réponse cohérent

<br/>

## Liens Connexes

- [🎯 🔙 Retour à Action getBalance](./action.md)
  
- [🎮 Service API XRP](./service.md)
- [📚 Exemples d'Utilisation](./examples.md)
- [🔙 Retour à l'Implémentation Principale](../plugin-implementation.md) 
