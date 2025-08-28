# Etape de l'authentification 

- Envoyer l'inscription ou l'email/mot de passe via fetch()
- Reçevoir 2 tokens : accessToken (court) + refreshToken (long)
- Stocke accessToken (en mémoire) et refreshToken (en cookie httpOnly sécurisé)
- Utilise accessToken dans fetch pour appeler des routes protégées
- Si le accessToken expire → utilise automatiquement le refreshToken (sans redemander l’email/mot de passe)
- Se déconnecte → efface les tokens


## Côté Front

Côté Frontend (client)

Le rôle :
Le frontend (React par exemple) gère uniquement l’interface utilisateur et envoie des requêtes.
Concrètement, il fait quoi ?
Collecte les infos dans un formulaire (email, password)
Envoie une requête POST vers /login sur le backend
Reçoit un accessToken (et parfois un cookie refreshToken)
Stocke le accessToken temporairement (ex : useState, context)
Ajoute le token dans les headers pour accéder à des routes privées
Déclenche une déconnexion si besoin (logout → appel API)
Le frontend ne vérifie jamais lui-même si un token est valide, il délègue au backend.


### Protéger les tokens côté client
Ne jamais stocker le token dans localStorage ou sessionStorage si possible
Le backend doit te renvoyer le refresh token dans un cookie httpOnly sécurisé
Tu peux garder l’accessToken temporairement en state, mais pas dans localStorage

Le frontend valide et nettoie les entrées, mais je compte sur le backend pour la vraie sécurité (authentification, injection, tokens). Et j’ai suivi les recommandations OWASP pour limiter les failles côté utilisateur.

#### Validation des champs en amont
Action concrète:

Prénom/Nom	min/max length, caractères autorisés, required
Email	Regex + type="email" + required
Mot de passe	min length (8+), caractères spéciaux, type="password", autoComplete="new-password"
Adresse/Ville/ZIP	Filtrage des caractères dangereux (<, >, SQL-like)
Compétences (skills)	Forcer une sélection (1 minimum), jamais libre
Photo	accept="image/*" + limite de taille (à faire au backend)

Caractères	Raisons
<, >	Pour éviter les balises HTML/XSS
", '	Pour éviter les injections SQL ou JS
@, #, $, *, 1 (chiffres)	Car un prénom ou une ville ne devrait pas contenir ça
/, \, =	Caractères de programmation ou d’injection