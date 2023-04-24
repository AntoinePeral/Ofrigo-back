# projet-06-o-frigo-back

# LIST OF ROUTES

## ACCOUNT

### Public


- `/register`  <span style="color:blue"><strong>`POST`</strong></span> - Crée un compte
  - `STATUT` : <span style="color:black"><strong>`WAITING FOR TEST`</strong></span>
- `/login`  <span style="color:blue"><strong>`POST`</strong></span> - Se connecter
  - `STATUT` : <span style="color:black"><strong>`WAITING FOR TEST`</strong></span>
- `/admin/login`  <span style="color:blue"><strong>`POST`</strong></span> - Se connecter en tant que admin
  - `STATUT` : <span style="color:black"><strong>`WAITING FOR TEST`</strong></span>

### User

- `/me/profile` <span style="color:green"><strong>`GET`</strong></span> - Données utilisateur connecté
  - `STATUT` : <span style="color:black"><strong>`WAITING FOR TEST`</strong></span>
- `/me/profile` <span style="color:orange"><strong>`PUT`</strong></span> - Modifie les données d'un utilisateur
  - `STATUT` : <span style="color:black"><strong>`WAITING FOR TEST`</strong></span>
- `/me/profile` <span style="color:red"><strong>`DELETE`</strong></span> - Supprime un utilisateur
  - `STATUT` : <span style="color:black"><strong>`WAITING FOR TEST`</strong></span>
- `/me/profile/ingredient`  <span style="color:blue"><strong>`POST`</strong></span> - Ajoute un ingredient a l'account
  - `STATUT` : <span style="color:black"><strong>`WAITING FOR TEST`</strong></span>
- `/me/profile/ingredient/:id` <span style="color:red"><strong>`DELETE`</strong></span> - Supprime un ingredient de l'account
  - `STATUT` : <span style="color:black"><strong>`WAITING FOR TEST`</strong></span>

### Admin

- `/admin/profile` <span style="color:green"><strong>`GET`</strong></span> - Affiche tous les comptes utilisateur
  - `STATUT` : <span style="color:black"><strong>`WAITING FOR TEST`</strong></span>
- `/admin/profile/:id` <span style="color:green"><strong>`GET`</strong></span> - Affiche un compte utilisateur
  - `STATUT` :  <span style="color:black"><strong>`WAITING FOR TEST`</strong></span>
- `/admin/profile/:id` <span style="color:red"><strong>`DELETE`</strong></span> - Supprime un compte utilisateur
  - `STATUT` : <span style="color:black"><strong>`WAITING FOR TEST`</strong></span>

## CATEGORY

### Publicbold text

- `/category` <span style="color:green"><strong>`GET`</strong></span> - Affiche toutes les categories
  - `STATUT` :  <span style="color:green"><strong>`OK`</strong></span>
- `/category/:id` <span style="color:green"><strong>`GET`</strong></span> - Affiche une categories
  - `STATUT` : <span style="color:green"><strong>`OK`</strong></span>

### Admin

- `/admin/category` <span style="color:green"><strong>`GET`</strong></span> - Affiche toutes les categories
  - `STATUT` : <span style="color:black"><strong>`WAITING FOR TEST`</strong></span>
- `/admin/category/:id` <span style="color:green"><strong>`GET`</strong></span> - Affiche une categories
  - `STATUT` : <span style="color:black"><strong>`WAITING FOR TEST`</strong></span>
- `/admin/category`  <span style="color:blue"><strong>`POST`</strong></span> - Crée une categorie
  - `STATUT` : <span style="color:black"><strong>`WAITING FOR TEST`</strong></span>
- `/admin/category/:id` <span style="color:orange"><strong>`PUT`</strong></span> - Modifie une categorie
  - `STATUT` : <span style="color:black"><strong>`WAITING FOR TEST`</strong></span>
- `/admin/category/:id` <span style="color:red"><strong>`DELETE`</strong></span> - Supprime une categorie 
  - `STATUT` : <span style="color:black"><strong>`WAITING FOR TEST`</strong></span>

## INGREDIENT

### Public

- `/ingredient` <span style="color:green"><strong>`GET`</strong></span> - Affiche tous les ingrédients
  - `STATUT` :  <span style="color:green"><strong>`OK`</strong></span>
- `/ingredient/:id` <span style="color:green"><strong>`GET`</strong></span> - Affiche un ingrédient
  - `STATUT` :  <span style="color:green"><strong>`OK`</strong></span>

### User

- `/me/profile/ingredient` <span style="color:green"><strong>`GET`</strong></span> - Affiche tous les ingredients d'un utilisateur
  - `STATUT` : <span style="color:black"><strong>`WAITING FOR TEST`</strong></span>
- `/me/profile/:id` <span style="color:green"><strong>`GET`</strong></span> - Affiche un ingredient d'un utilisateur
  - `STATUT` : <span style="color:black"><strong>`WAITING FOR TEST`</strong></span>

### Admin

- `/admin/ingredient` <span style="color:green"><strong>`GET`</strong></span> - Affiche tous les ingrédients
  - `STATUT` : <span style="color:black"><strong>`WAITING FOR TEST`</strong></span>
- `/admin/ingredient/:id` <span style="color:green"><strong>`GET`</strong></span> - Affiche un ingrédient
  - `STATUT` : <span style="color:black"><strong>`WAITING FOR TEST`</strong></span>
- `/admin/ingredient`  <span style="color:blue"><strong>`POST`</strong></span> - Crée un ingrédient
  - `STATUT` : <span style="color:black"><strong>`WAITING FOR TEST`</strong></span>
- `/admin/ingredient` <span style="color:orange"><strong>`PUT`</strong></span> - Modifie un ingrédient
  - `STATUT` : <span style="color:black"><strong>`WAITING FOR TEST`</strong></span>
- `/admin/ingredient` <span style="color:red"><strong>`DELETE`</strong></span> - Supprime un ingrédient
  - `STATUT` : <span style="color:black"><strong>`WAITING FOR TEST`</strong></span>

## MESSAGE

### Public

- `/contact` <span style="color:blue"><strong>`POST`</strong></span> - Envoyer un message
  - `STATUT` : <span style="color:black"><strong>`WAITING FOR TEST`</strong></span>

### User

- `/me/profile/message` <span style="color:green"><strong>`GET`</strong></span> - Affiche toutes les messages d'un utilisateur
  - `STATUT` : <span style="color:black"><strong>`WAITING FOR TEST`</strong></span>
- `/me/profile/message/:id` <span style="color:green"><strong>`GET`</strong></span> - Affiche un message d'un utilisateur
  - `STATUT` : <span style="color:black"><strong>`WAITING FOR TEST`</strong></span>
- `/me/profile/contact`  <span style="color:blue"><strong>`POST`</strong></span> - Envoyer un message en tant qu'utilisateur
  - `STATUT` : <span style="color:black"><strong>`WAITING FOR TEST`</strong></span>
- `/me/profile/message/:id` <span style="color:orange"><strong>`PUT`</strong></span> - Modifie un message de l'utilisateur
  - `STATUT` : <span style="color:black"><strong>`WAITING FOR TEST`</strong></span>
- `/me/profile/message/:id` <span style="color:red"><strong>`DELETE`</strong></span> - Supprime un message de l'utilisateur
  - `STATUT` : <span style="color:black"><strong>`WAITING FOR TEST`</strong></span>

### Admin

- `/admin/message` <span style="color:green"><strong>`GET`</strong></span> - Affiche tous les messages
  - `STATUT` : <span style="color:black"><strong>`WAITING FOR TEST`</strong></span>
- `/admin/message/:id` <span style="color:green"><strong>`GET`</strong></span> - Affiche un message
  - `STATUT` : <span style="color:black"><strong>`WAITING FOR TEST`</strong></span>
- `/admin/contact`  <span style="color:blue"><strong>`POST`</strong></span> - Envoyer un message en tant que admin
  - `STATUT` : <span style="color:black"><strong>`WAITING FOR TEST`</strong></span>
- `/admin/message/:id` <span style="color:orange"><strong>`PUT`</strong></span> - Modifie un message d'un admin
  - `STATUT` : <span style="color:black"><strong>`WAITING FOR TEST`</strong></span>
- `/admin/message/:id` <span style="color:red"><strong>`DELETE`</strong></span> - Supprime un message de l'admin
  - `STATUT` : <span style="color:black"><strong>`WAITING FOR TEST`</strong></span>

## RECIPE

### Public

- `/recipe` <span style="color:green"><strong>`GET`</strong></span> - Affiche toutes les recettes
  - `STATUT` :  <span style="color:green"><strong>`OK`</strong></span>
- `/recipe/:id` <span style="color:green"><strong>`GET`</strong></span> - Affiche une recette
  - `STATUT` :  <span style="color:green"><strong>`OK`</strong></span>

### Admin

- `/admin/recipe` <span style="color:green"><strong>`GET`</strong></span> - Affiche toutes les recettes
  - `STATUT` : <span style="color:black"><strong>`WAITING FOR TEST`</strong></span>
- `/admin/recipe/:id` <span style="color:green"><strong>`GET`</strong></span> - Affiche une recette
  - `STATUT` : <span style="color:black"><strong>`WAITING FOR TEST`</strong></span>
- `/admin/recipe`  <span style="color:blue"><strong>`POST`</strong></span> - Créer une recette (seul)
  - `STATUT` : <span style="color:black"><strong>`WAITING FOR TEST`</strong></span>
- `/admin/recipe/:id` <span style="color:orange"><strong>`PUT`</strong></span> - Modifie une recette
  - `STATUT` : <span style="color:black"><strong>`WAITING FOR TEST`</strong></span>
- `/admin/recipe/:id` <span style="color:red"><strong>`DELETE`</strong></span> - Supprime une recette
  - `STATUT` : <span style="color:black"><strong>`WAITING FOR TEST`</strong></span>

## TAG

### Public

- `/tag` <span style="color:green"><strong>`GET`</strong></span> - Affiche toutes les tags
  - `STATUT` :  <span style="color:green"><strong>`OK`</strong></span>
- `/tag/:id` <span style="color:green"><strong>`GET`</strong></span> - Affiche un tag
  - `STATUT` :  <span style="color:green"><strong>`OK`</strong></span>

### Admin

- `/admin/tag` <span style="color:green"><strong>`GET`</strong></span> - Affiche toutes les tags
  - `STATUT` : <span style="color:black"><strong>`WAITING FOR TEST`</strong></span>
- `/admin/tag/:id` <span style="color:green"><strong>`GET`</strong></span> - Affiche un tag
  - `STATUT` : <span style="color:black"><strong>`WAITING FOR TEST`</strong></span>
- `/admin/tag`  <span style="color:blue"><strong>`POST`</strong></span> - Crée un tag
  - `STATUT` : <span style="color:black"><strong>`WAITING FOR TEST`</strong></span>
- `/admin/tag/:id` <span style="color:orange"><strong>`PUT`</strong></span> - Modifie un tag 
  - `STATUT` : <span style="color:black"><strong>`WAITING FOR TEST`</strong></span>
- `/admin/tag/:id` <span style="color:red"><strong>`DELETE`</strong></span> - Supprime un tag
  - `STATUT` : <span style="color:black"><strong>`WAITING FOR TEST`</strong></span>