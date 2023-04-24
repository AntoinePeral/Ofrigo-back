# projet-06-o-frigo-back

# LISTE DES ROUTES

## ACCOUNT

### Public

- `/register`  <span style="color:blue"><strong>`POST`</strong></span> Crée un compte
  - `STATUT` : 
- `/login`  <span style="color:blue"><strong>`POST`</strong></span> Se connecter
  - `STATUT` : 
- `/admin/login`  <span style="color:blue"><strong>`POST`</strong></span> Se connecter en tant que admin
  - `STATUT` : 

### User

- `/me/profile` <span style="color:green"><strong>`GET`</strong></span> Données utilisateur connecté
  - `STATUT` : 
- `/me/profile` <span style="color:orange"><strong>`PUT`</strong></span> Modifie les données d'un utilisateur
  - `STATUT` : 
- `/me/profile` <span style="color:red"><strong>`DELETE`</strong></span> Supprime un utilisateur
  - `STATUT` : 
- `/me/profile/ingredient`  <span style="color:blue"><strong>`POST`</strong></span> Ajoute un ingredient a l'account
  - `STATUT` : 
- `/me/profile/ingredient/:id` <span style="color:red"><strong>`DELETE`</strong></span> Supprime un ingredient de l'account
  - `STATUT` : 

### Admin

- `/admin/profile` <span style="color:green"><strong>`GET`</strong></span> Affiche tous les comptes utilisateur
  - `STATUT` : 
- `/admin/profile/:id` <span style="color:green"><strong>`GET`</strong></span> Affiche un compte utilisateur
  - `STATUT` :  
- `/admin/profile/:id` <span style="color:red"><strong>`DELETE`</strong></span> Supprime un compte utilisateur
  - `STATUT` : 

## CATEGORY

### Publicbold text

- `/category` <span style="color:green"><strong>`GET`</strong></span> Affiche toutes les categories
  - `STATUT` :  <span style="color:green"><strong>`OK`</strong></span>
- `/category/:id` <span style="color:green"><strong>`GET`</strong></span> Affiche une categories
  - `STATUT` : <span style="color:green"><strong>`OK`</strong></span>

### Admin

- `/admin/category` <span style="color:green"><strong>`GET`</strong></span> Affiche toutes les categories
  - `STATUT` : 
- `/admin/category/:id` <span style="color:green"><strong>`GET`</strong></span>` Affiche une categories
  - `STATUT` : 
- `/admin/category`  <span style="color:blue"><strong>`POST`</strong></span> Crée une categorie
  - `STATUT` : 
- `/admin/category/:id` <span style="color:orange"><strong>`PUT`</strong></span> Modifie une categorie
  - `STATUT` :  
- `/admin/category/:id` <span style="color:red"><strong>`DELETE`</strong></span> Supprime une categorie 
  - `STATUT` : 

## INGREDIENT

### Public

- `/ingredient` <span style="color:green"><strong>`GET`</strong></span> Affiche tous les ingrédients
  - `STATUT` :  <span style="color:green"><strong>`OK`</strong></span>
- `/ingredient/:id` <span style="color:green"><strong>`GET`</strong></span> Affiche un ingrédient
  - `STATUT` :  <span style="color:green"><strong>`OK`</strong></span>

### User

- `/me/profile/ingredient` <span style="color:green"><strong>`GET`</strong></span> Affiche tous les ingredients d'un utilisateur
  - `STATUT` : 
- `/me/profile/:id` <span style="color:green"><strong>`GET`</strong></span> Affiche un ingredient d'un utilisateur
  - `STATUT` : 

### Admin

- `/admin/ingredient` <span style="color:green"><strong>`GET`</strong></span> Affiche tous les ingrédients
  - `STATUT` : 
- `/admin/ingredient/:id` <span style="color:green"><strong>`GET`</strong></span> Affiche un ingrédient
  - `STATUT` : 
- `/admin/ingredient`  <span style="color:blue"><strong>`POST`</strong></span> Crée un ingrédient
  - `STATUT` : 
- `/admin/ingredient` <span style="color:orange"><strong>`PUT`</strong></span> Modifie un ingrédient
  - `STATUT` : 
- `/admin/ingredient` <span style="color:red"><strong>`DELETE`</strong></span> Supprime un ingrédient
  - `STATUT` : 

## MESSAGE

### Public

- `/contact` <span style="color:blue"><strong>`POST`</strong></span> Envoyer un message
  - `STATUT` : 

### User

- `/me/profile/message` <span style="color:green"><strong>`GET`</strong></span> Affiche toutes les messages d'un utilisateur
  - `STATUT` : 
- `/me/profile/message/:id` <span style="color:green"><strong>`GET`</strong></span> Affiche un message d'un utilisateur
  - `STATUT` : 
- `/me/profile/contact`  <span style="color:blue"><strong>`POST`</strong></span> Envoyer un message en tant qu'utilisateur
  - `STATUT` : 
- `/me/profile/message/:id` <span style="color:orange"><strong>`PUT`</strong></span> Modifie un message de l'utilisateur
  - `STATUT` : 
- `/me/profile/message/:id` <span style="color:red"><strong>`DELETE`</strong></span> Supprime un message de l'utilisateur
  - `STATUT` : 

### Admin

- `/admin/message` <span style="color:green"><strong>`GET`</strong></span> Affiche tous les messages
  - `STATUT` : 
- `/admin/message/:id` <span style="color:green"><strong>`GET`</strong></span> Affiche un message
  - `STATUT` : 
- `/admin/contact`  <span style="color:blue"><strong>`POST`</strong></span> Envoyer un message en tant que admin
  - `STATUT` : 
- `/admin/message/:id` <span style="color:orange"><strong>`PUT`</strong></span> Modifie un message d'un admin
  - `STATUT` : 
- `/admin/message/:id` <span style="color:red"><strong>`DELETE`</strong></span> Supprime un message de l'admin
  - `STATUT` : 

## RECIPE

### Public

- `/recipe` <span style="color:green"><strong>`GET`</strong></span> Affiche toutes les recettes
  - `STATUT` :  <span style="color:green"><strong>`OK`</strong></span>
- `/recipe/:id` <span style="color:green"><strong>`GET`</strong></span> Affiche une recette
  - `STATUT` :  <span style="color:green"><strong>`OK`</strong></span>

### Admin

- `/admin/recipe` <span style="color:green"><strong>`GET`</strong></span> Affiche toutes les recettes
  - `STATUT` : 
- `/admin/recipe/:id` <span style="color:green"><strong>`GET`</strong></span> Affiche une recette
  - `STATUT` : 
- `/admin/recipe`  <span style="color:blue"><strong>`POST`</strong></span> Créer une recette (seul)
  - `STATUT` : 
- `/admin/recipe/:id` <span style="color:orange"><strong>`PUT`</strong></span> Modifie une recette
  - `STATUT` : 
- `/admin/recipe/:id` <span style="color:red"><strong>`DELETE`</strong></span> Supprime une recette
  - `STATUT` : 

## TAG

### Public

- `/tag` <span style="color:green"><strong>`GET`</strong></span> Affiche toutes les tags
  - `STATUT` :  <span style="color:green"><strong>`OK`</strong></span>
- `/tag/:id` <span style="color:green"><strong>`GET`</strong></span> Affiche un tag
  - `STATUT` :  <span style="color:green"><strong>`OK`</strong></span>

### Admin

- `/admin/tag` <span style="color:green"><strong>`GET`</strong></span> Affiche toutes les tags
  - `STATUT` : 
- `/admin/tag/:id` <span style="color:green"><strong>`GET`</strong></span> Affiche un tag
  - `STATUT` : 
- `/admin/tag`  <span style="color:blue"><strong>`POST`</strong></span> Crée un tag
  - `STATUT` : 
- `/admin/tag/:id` <span style="color:orange"><strong>`PUT`</strong></span> Modifie un tag 
  - `STATUT` : 
- `/admin/tag/:id` <span style="color:red"><strong>`DELETE`</strong></span> Supprime un tag
  - `STATUT` : 