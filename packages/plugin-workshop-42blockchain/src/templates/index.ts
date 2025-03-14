export const formatBalanceTemplate = `
Contexte:
- Adresse du portefeuille: {{address}}
- Solde: {{balance}} {{currency}}

Ne rajoute pas d'informations supplémentaires, reste factuel.

Changer la tournure de cette exemple pour que ce soit plus naturel et aleatoire.

Ta reponse devra ressembler à ceci:
Ce wallet a {{balance}} {{currency}}.

ou

D'apres que j'ai trouver sur l'explorateur, {{address}} a {{balance}} {{currency}}.
`;