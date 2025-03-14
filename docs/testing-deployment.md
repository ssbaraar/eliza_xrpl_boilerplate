# 🧪 Test et Déploiement

Ce guide explique comment tester et déployer votre plugin ElizaOS.

<br/>

## Préparation au Déploiement

### 1. Build du Projet

```bash
# Installation des dépendances
pnpm install --no-frozen-lockfile

# Build du plugin
pnpm build
```

### 2. Linking du Plugin

```bash
# Si ce n'est pas deja fait
pnpm link [votre-plugin]
```

## Tests

1. **Démarrage du Client Web**
```bash
pnpm start:client
```

2. **Démarrage de l'Agent**
```bash
pnpm start --character="characters/workshop.character.json"
```

<br/>

### 2. Erreurs Communes


   - Vérifier les dépendances
   - Vérifier la configuration TypeScript
   - Link du plugin
   - Nettoyer le cache : `pnpm clean /// pnpm store prune`

<br/>



## MERCI C'EST LA FIN <3

Si ce workshop vous a été utile, n'hésitez pas à star ce repository !

  [retour a la home](../)

<br/>

<br/>

- [🚀 Retour à la Démarrage Rapide](./quickstart.md)
- [📁 Retour à la Structure du Projet](./project-structure.md)
- [🔧 Retour à l'Implémentation](./plugin-implementation.md)
- [🎭 Retour à la Configuration du Character](./character-config.md)



