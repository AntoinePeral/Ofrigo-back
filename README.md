# projet-06-o-frigo-back

# LISTE DES ROUTES

## ACCOUNT

### Public
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/register`|<span style="color:aqua"><strong>`POST`</strong></span>|Crée un compte|<strong>`WAITING FOR TEST`</strong>
|`/login`|<span style="color:aqua"><strong>`POST`</strong></span>|Se connecter|<strong>`WAITING FOR TEST`</strong>|
|`/admin/login`|<span style="color:aqua"><strong>`POST`</strong></span>|Se connecter en tant que admin|<strong>`WAITING FOR TEST`</strong>|

### User
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/me/profile`|<span style="color:green"><strong>`GET`</strong></span>|Données utilisateur connecté|<strong>`WAITING FOR TEST`</strong>|
|`/me/profile`|<span style="color:orange"><strong>`PUT`</strong></span>|Modifie les données d'un utilisateur|<strong>`WAITING FOR TEST`</strong>|
|`/me/profile`|<span style="color:red"><strong>`DELETE`</strong></span>|Supprime un utilisateur|<strong>`WAITING FOR TEST`</strong>|
|`/me/profile/ingredient`|<span style="color:aqua"><strong>`POST`</strong></span>|Ajoute un ingredient a l'account|<strong>`WAITING FOR TEST`</strong>|
|`/me/profile/ingredient/:id`|<span style="color:red"><strong>`DELETE`</strong></span>|Supprime un ingredient de l'account|<strong>`WAITING FOR TEST`</strong>|

### Admin
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/admin/profile`|<span style="color:green"><strong>`GET`</strong></span>|Affiche tous les comptes utilisateur|<strong>`WAITING FOR TEST`</strong>|
|`/admin/profile/:id`|<span style="color:green"><strong>`GET`</strong></span>|Affiche un compte utilisateur|<strong>`WAITING FOR TEST`</strong>|
|`/admin/profile/:id`|<span style="color:red"><strong>`DELETE`</strong></span>|Supprime un compte utilisateur|<strong>`WAITING FOR TEST`</strong>|

## CATEGORY

### Public
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/category`|<span style="color:green"><strong>`GET`</strong></span>|Affiche toutes les categories|<span style="color:green"><strong>`OK`</strong></span>|
|`/category/:id`|<span style="color:green"><strong>`GET`</strong></span>|Affiche une categories|<span style="color:green"><strong>`OK`</strong></span>|

### Admin
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/admin/category`|<span style="color:green"><strong>`GET`</strong></span>|Affiche toutes les categories|<strong>`WAITING FOR TEST`</strong>|
|`/admin/category/:id`| <span style="color:green"><strong>`GET`</strong></span>|Affiche une categories|<strong>`WAITING FOR TEST`</strong>|
|`/admin/category`|<span style="color:aqua"><strong>`POST`</strong></span>|Crée une categorie|<strong>`WAITING FOR TEST`</strong>|
|`/admin/category/:id`|<span style="color:orange"><strong>`PUT`</strong></span>|Modifie une categorie|<strong>`WAITING FOR TEST`</strong>|
|`/admin/category/:id`|<span style="color:red"><strong>`DELETE`</strong></span>|Supprime une categorie |<strong>`WAITING FOR TEST`</strong>|

## INGREDIENT

### Public
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/ingredient`|<span style="color:green"><strong>`GET`</strong></span>|Affiche tous les ingrédients|<span style="color:green"><strong>`OK`</strong></span>|
|`/ingredient/:id`|<span style="color:green"><strong>`GET`</strong></span>|Affiche un ingrédient|<span style="color:green"><strong>`OK`</strong></span>|

### User
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/me/profile/ingredient`|<span style="color:green"><strong>`GET`</strong></span>|Affiche tous les ingredients d'un utilisateur|<strong>`WAITING FOR TEST`</strong>|
|`/me/profile/:id`|<span style="color:green"><strong>`GET`</strong></span>|Affiche un ingredient d'un utilisateur|<strong>`WAITING FOR TEST`</strong>|

### Admin
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/admin/ingredient`|<span style="color:green"><strong>`GET`</strong></span>|Affiche tous les ingrédients|<strong>`WAITING FOR TEST`</strong>|
|`/admin/ingredient/:id`|<span style="color:green"><strong>`GET`</strong></span>|Affiche un ingrédient|<strong>`WAITING FOR TEST`</strong>|
|`/admin/ingredient`|<span style="color:aqua"><strong>`POST`</strong></span>|Crée un ingrédient|<strong>`WAITING FOR TEST`</strong>|
|`/admin/ingredient`|<span style="color:orange"><strong>`PUT`</strong></span>|Modifie un ingrédient|<strong>`WAITING FOR TEST`</strong>|
|`/admin/ingredient`|<span style="color:red"><strong>`DELETE`</strong></span>|Supprime un ingrédient|<strong>`WAITING FOR TEST`</strong>|

## MESSAGE

### Public
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/contact`|<span style="color:aqua"><strong>`POST`</strong></span>|Envoyer un message|<strong>`WAITING FOR TEST`</strong>|

### User
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/me/profile/message`|<span style="color:green"><strong>`GET`</strong></span>|Affiche toutes les messages d'un utilisateur|<strong>`WAITING FOR TEST`</strong>|
|`/me/profile/message/:id`|<span style="color:green"><strong>`GET`</strong></span>|Affiche un message d'un utilisateur|<strong>`WAITING FOR TEST`</strong>|
|`/me/profile/contact`|<span style="color:aqua"><strong>`POST`</strong></span>|Envoyer un message en tant qu'utilisateur|<strong>`WAITING FOR TEST`</strong>|
|`/me/profile/message/:id`|<span style="color:orange"><strong>`PUT`</strong></span>|Modifie un message de l'utilisateur|<strong>`WAITING FOR TEST`</strong>|
|`/me/profile/message/:id`|<span style="color:red"><strong>`DELETE`</strong></span>|Supprime un message de l'utilisateur|<strong>`WAITING FOR TEST`</strong>|

### Admin
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/admin/message`|<span style="color:green"><strong>`GET`</strong></span>|Affiche tous les messages|<strong>`WAITING FOR TEST`</strong>|
|`/admin/message/:id`|<span style="color:green"><strong>`GET`</strong></span>|Affiche un message|<strong>`WAITING FOR TEST`</strong>|
|`/admin/contact`|<span style="color:aqua"><strong>`POST`</strong></span>|Envoyer un message en tant que admin|<strong>`WAITING FOR TEST`</strong>|
|`/admin/message/:id`|<span style="color:orange"><strong>`PUT`</strong></span>|Modifie un message d'un admin|<strong>`WAITING FOR TEST`</strong>|
|`/admin/message/:id`|<span style="color:red"><strong>`DELETE`</strong></span>|Supprime un message de l'admin|<strong>`WAITING FOR TEST`</strong>|

## RECIPE

### Public
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/recipe`|<span style="color:green"><strong>`GET`</strong></span>|Affiche toutes les recettes|<span style="color:green"><strong>`OK`</strong></span>|
|`/recipe/:id`|<span style="color:green"><strong>`GET`</strong></span>|Affiche une recette|<span style="color:green"><strong>`OK`</strong></span>|

### Admin
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/admin/recipe`|<span style="color:green"><strong>`GET`</strong></span>|Affiche toutes les recettes|<strong>`WAITING FOR TEST`</strong>|
|`/admin/recipe/:id`|<span style="color:green"><strong>`GET`</strong></span>|Affiche une recette|<strong>`WAITING FOR TEST`</strong>|
|`/admin/recipe`|<span style="color:aqua"><strong>`POST`</strong></span>|Créer une recette|<strong>`WAITING FOR TEST`</strong>|
|`/admin/recipe/:id`|<span style="color:orange"><strong>`PUT`</strong></span>|Modifie une recette|<strong>`WAITING FOR TEST`</strong>|
|`/admin/recipe/:id`|<span style="color:red"><strong>`DELETE`</strong></span>|Supprime une recette|<strong>`WAITING FOR TEST`</strong>|

## TAG

### Public
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/tag`|<span style="color:green"><strong>`GET`</strong></span>|Affiche toutes les tags|<span style="color:green"><strong>`OK`</strong></span>|
|`/tag/:id`|<span style="color:green"><strong>`GET`</strong></span>|Affiche un tag|<span style="color:green"><strong>`OK`</strong></span>|

### Admin
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/admin/tag`|<span style="color:green"><strong>`GET`</strong></span>|Affiche toutes les tags|<strong>`WAITING FOR TEST`</strong>|
|`/admin/tag/:id`|<span style="color:green"><strong>`GET`</strong></span>|Affiche un tag|<strong>`WAITING FOR TEST`</strong>|
|`/admin/tag`|<span style="color:aqua"><strong>`POST`</strong></span>|Crée un tag|<strong>`WAITING FOR TEST`</strong>|
|`/admin/tag/:id`|<span style="color:orange"><strong>`PUT`</strong></span>|Modifie un tag|<strong>`WAITING FOR TEST`</strong>|
|`/admin/tag/:id`|<span style="color:red"><strong>`DELETE`</strong></span>|Supprime un tag|<strong>`WAITING FOR TEST`</strong>|