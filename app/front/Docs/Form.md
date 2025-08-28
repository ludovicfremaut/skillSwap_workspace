# FormSection.tsx

- Composant racine de la section d’authentification (inscription / connexion)
Gère le switch entre SignupForm et LoginForm
Bouton “Déjà un compte ?” qui bascule l'affichage


## SignupForm.tsx

- Formulaire d'inscription
Gère les inputs (firstName, email, etc.)
Ouvre la SkillModal au clic sur “Choisir mes compétences”
Envoie les données au console.log ou au backend (plus tard)
C'est ici que formData.skills est mis à jour depuis la modale.


### SkillModal.tsx

- Modale centrée pour choisir les compétences
Appelle le composant SkillSelector
Permet de valider ou annuler
Gère une copie temporaire (localSkills) avant de remonter vers SignupForm


#### SkillSelector.tsx
- Composant UI avec select + checkbox pour choisir les compétences
Tu choisis une catégorie (frontend, etc.)
Tu coches/décoches les compétences
Tu vois celles sélectionnées en bulles à droite
💡 Ce composant est totalement réutilisable (même ailleurs que dans une modale).


##### LoginForm.tsx
- Formulaire de connexion
Simple : email + mot de passe
Il enverra bientôt les infos à useAuth().login()
🎯 À lire à la fin car c’est le plus court et isolé.


- En résumé (dans cet ordre) :
FormSection → comment les formulaires s’affichent
SignupForm → logique principale de l'inscription
SkillModal → modale déclenchée depuis SignupForm
SkillSelector → gestion fine des compétences
LoginForm → à relier bientôt à useAuth