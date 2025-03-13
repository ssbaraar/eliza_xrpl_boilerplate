# 📝 Templates de Réponse

📂 [Voir le code source](../../packages/plugin-workshop-42blockchain/src/examples/getBalanceExamples.ts)

Ce document détaille la configuration et l'utilisation des templates pour générer des réponses naturelles.

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

## Personnalisation des Réponses

### 1. Style Factuel
```typescript
export const formatBalanceTemplate = `
Contexte:
- Adresse: {{address}}
- Solde: {{balance}} {{currency}}

Génère une réponse factuelle et précise.
`;
```

### 2. Style Conversationnel
```typescript
export const formatBalanceTemplate = `
Contexte:
- Adresse: {{address}}
- Solde: {{balance}} {{currency}}

Génère une réponse naturelle et amicale.
Utilise un ton décontracté et des emojis.
`;
```

### 3. Style Professionnel
```typescript
export const formatBalanceTemplate = `
Contexte:
- Adresse: {{address}}
- Solde: {{balance}} {{currency}}

Génère une réponse professionnelle et formelle.
Utilise un langage soutenu.
`;
```

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

## Instructions de Template

### 1. Instructions de Base
```typescript
Ne rajoute pas d'informations supplémentaires, reste factuel.
```
- Guide le LLM pour des réponses concises
- Évite les informations non pertinentes

### 2. Variations de Style
```typescript
Ta réponse devra ressembler à ceci:
Ce wallet a {{balance}} {{currency}}.
```
- Fournit des exemples de format
- Guide le style de réponse

### 3. Alternatives
```typescript
ou

D'après ce que j'ai trouvé sur l'explorateur, {{address}} a {{balance}} {{currency}}.
```
- Offre plusieurs formats possibles
- Permet de la variété dans les réponses

## Bonnes Pratiques

1. **Clarté**
   - Instructions claires et précises
   - Exemples de format souhaité
   - Variables bien identifiées

2. **Flexibilité**
   - Plusieurs styles de réponse
   - Adaptabilité au contexte
   - Variations naturelles

3. **Performance**
   - Templates concis
   - Instructions essentielles
   - Utilisation appropriée du LLM

## Intégration avec les Exemples

Les templates doivent être cohérents avec [les exemples](./examples.md) :
- Style de langage similaire
- Ton approprié
- Format de réponse cohérent

## Liens Connexes

- [🎯 Action getBalance](./action.md)
- [📚 Exemples d'Utilisation](./examples.md)
- [🔙 Retour à l'Implémentation Principale](../plugin-implementation.md) 