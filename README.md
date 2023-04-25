# PROJECT O'FRIGO BACK

# LISTE DES ROUTES

## <ins>ACCOUNT</ins>

### Public
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/register`|<span style="color:aqua"><strong>`POST`</strong></span>|Ajouter un compte|<span style="color:gold"><strong>`OK`</strong></span>|
|`/login`|<span style="color:aqua"><strong>`POST`</strong></span>|Se connecter|<span style="color:gold"><strong>`OK`</strong></span>| 

### User
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/:me/profile`|<span style="color:green"><strong>`GET`</strong></span>|Affiche les données utilisateur|<strong>`WAITING FOR TEST`</strong>|
|`/:me/profile`|<span style="color:orange"><strong>`PUT`</strong></span>|Modifie les données de l'utilisateur|<strong>`WAITING FOR TEST`</strong>|
|`/:me/profile`|<span style="color:red"><strong>`DELETE`</strong></span>|Supprime son compte utilisateur|<strong>`WAITING FOR TEST`</strong>|
|`/:me/profile/ingredient`|<span style="color:aqua"><strong>`POST`</strong></span>|Ajoute un ingredient au compte utilisateur|<strong>`WAITING FOR TEST`</strong>|
|`/:me/profile/ingredient/:id`|<span style="color:red"><strong>`DELETE`</strong></span>|Supprime un ingredient du compte utilisateur|<strong>`WAITING FOR TEST`</strong>|

### Admin
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/admin/login`|<span style="color:aqua"><strong>`POST`</strong></span>|Se connecter en tant qu'admin|<strong>`WAITING FOR TEST`</strong>|
|`/admin/profile`|<span style="color:green"><strong>`GET`</strong></span>|Affiche tous les comptes utilisateur|<strong>`WAITING FOR TEST`</strong>|
|`/admin/profile/:id`|<span style="color:green"><strong>`GET`</strong></span>|Affiche un compte utilisateur|<strong>`WAITING FOR TEST`</strong>|
|`/admin/profile/:id`|<span style="color:red"><strong>`DELETE`</strong></span>|Supprime un compte utilisateur|<strong>`WAITING FOR TEST`</strong>|

## <ins>CATEGORY</ins>

### Public
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/category`|<span style="color:green"><strong>`GET`</strong></span>|Affiche toutes les categories|<span style="color:gold"><strong>`OK`</strong></span>|
|`/category/:id`|<span style="color:green"><strong>`GET`</strong></span>|Affiche une categorie|<span style="color:gold"><strong>`OK`</strong></span>|

### Admin
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/admin/category`|<span style="color:green"><strong>`GET`</strong></span>|Affiche toutes les categories|<strong>`WAITING FOR TEST`</strong>|
|`/admin/category/:id`| <span style="color:green"><strong>`GET`</strong></span>|Affiche une categorie|<strong>`WAITING FOR TEST`</strong>|
|`/admin/category`|<span style="color:aqua"><strong>`POST`</strong></span>|Crée une categorie|<strong>`WAITING FOR TEST`</strong>|
|`/admin/category/:id`|<span style="color:orange"><strong>`PUT`</strong></span>|Modifie une categorie|<strong>`WAITING FOR TEST`</strong>|
|`/admin/category/:id`|<span style="color:red"><strong>`DELETE`</strong></span>|Supprime une categorie |<strong>`WAITING FOR TEST`</strong>|

## <ins>INGREDIENT</ins>

### Public
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/ingredient`|<span style="color:green"><strong>`GET`</strong></span>|Affiche tous les ingrédients|<span style="color:gold"><strong>`OK`</strong></span>|
|`/ingredient/:id`|<span style="color:green"><strong>`GET`</strong></span>|Affiche un ingrédient|<span style="color:gold"><strong>`OK`</strong></span>|

### User
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/:me/profile/ingredient`|<span style="color:green"><strong>`GET`</strong></span>|Affiche tous les ingredients d'un utilisateur|<strong>`WAITING FOR TEST`</strong>|
|`/me/profile/:id`|<span style="color:green"><strong>`GET`</strong></span>|Affiche un ingredient d'un utilisateur|<strong>`WAITING FOR TEST`</strong>|

### Admin
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/admin/ingredient`|<span style="color:green"><strong>`GET`</strong></span>|Affiche tous les ingrédients|<strong>`WAITING FOR TEST`</strong>|
|`/admin/ingredient/:id`|<span style="color:green"><strong>`GET`</strong></span>|Affiche un ingrédient|<strong>`WAITING FOR TEST`</strong>|
|`/admin/ingredient`|<span style="color:aqua"><strong>`POST`</strong></span>|Crée un ingrédient|<strong>`WAITING FOR TEST`</strong>|
|`/admin/ingredient`|<span style="color:orange"><strong>`PUT`</strong></span>|Modifie un ingrédient|<strong>`WAITING FOR TEST`</strong>|
|`/admin/ingredient`|<span style="color:red"><strong>`DELETE`</strong></span>|Supprime un ingrédient|<strong>`WAITING FOR TEST`</strong>|

## <ins>MESSAGE</ins>

### Public
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/contact`|<span style="color:aqua"><strong>`POST`</strong></span>|Envoyer un message|<span style="color:gold"><strong>`OK`</strong></span>|

### User
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/:me/profile/message`|<span style="color:green"><strong>`GET`</strong></span>|Affiche toutes les messages d'un utilisateur|<strong>`WAITING FOR TEST`</strong>|
|`/:me/profile/message/:id`|<span style="color:green"><strong>`GET`</strong></span>|Affiche un message d'un utilisateur|<strong>`WAITING FOR TEST`</strong>|
|`/:me/profile/contact`|<span style="color:aqua"><strong>`POST`</strong></span>|Envoyer un message en tant qu'utilisateur|<strong>`WAITING FOR TEST`</strong>|
|`/:me/profile/message/:id`|<span style="color:orange"><strong>`PUT`</strong></span>|Modifie un message de l'utilisateur|<strong>`WAITING FOR TEST`</strong>|
|`/:me/profile/message/:id`|<span style="color:red"><strong>`DELETE`</strong></span>|Supprime un message de l'utilisateur|<strong>`WAITING FOR TEST`</strong>|

### Admin
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/admin/message`|<span style="color:green"><strong>`GET`</strong></span>|Affiche tous les messages|<strong>`WAITING FOR TEST`</strong>|
|`/admin/message/:id`|<span style="color:green"><strong>`GET`</strong></span>|Affiche un message|<strong>`WAITING FOR TEST`</strong>|
|`/admin/contact`|<span style="color:aqua"><strong>`POST`</strong></span>|Envoyer un message en tant qu'admin|<strong>`WAITING FOR TEST`</strong>|
|`/admin/message/:id`|<span style="color:orange"><strong>`PUT`</strong></span>|Modifie un message d'un admin|<strong>`WAITING FOR TEST`</strong>|
|`/admin/message/:id`|<span style="color:red"><strong>`DELETE`</strong></span>|Supprime un message de l'admin|<strong>`WAITING FOR TEST`</strong>|

## <ins>RECIPE</ins>

### Public
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/recipe`|<span style="color:green"><strong>`GET`</strong></span>|Affiche toutes les recettes|<span style="color:gold"><strong>`OK`</strong></span>|
|`/recipe/:id`|<span style="color:green"><strong>`GET`</strong></span>|Affiche une recette|<span style="color:gold"><strong>`OK`</strong></span>|

### Admin
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/admin/recipe`|<span style="color:green"><strong>`GET`</strong></span>|Affiche toutes les recettes|<strong>`WAITING FOR TEST`</strong>|
|`/admin/recipe/:id`|<span style="color:green"><strong>`GET`</strong></span>|Affiche une recette|<strong>`WAITING FOR TEST`</strong>|
|`/admin/recipe`|<span style="color:aqua"><strong>`POST`</strong></span>|Créer une recette|<strong>`WAITING FOR TEST`</strong>|
|`/admin/recipe/:id`|<span style="color:orange"><strong>`PUT`</strong></span>|Modifie une recette|<strong>`WAITING FOR TEST`</strong>|
|`/admin/recipe/:id`|<span style="color:red"><strong>`DELETE`</strong></span>|Supprime une recette|<strong>`WAITING FOR TEST`</strong>|

## <ins>TAG</ins>

### Public
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/tag`|<span style="color:green"><strong>`GET`</strong></span>|Affiche tous les tags|<span style="color:gold"><strong>`OK`</strong></span>|
|`/tag/:id`|<span style="color:green"><strong>`GET`</strong></span>|Affiche un tag|<span style="color:gold"><strong>`OK`</strong></span>|

### Admin
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/admin/tag`|<span style="color:green"><strong>`GET`</strong></span>|Affiche tous les tags|<strong>`WAITING FOR TEST`</strong>|
|`/admin/tag/:id`|<span style="color:green"><strong>`GET`</strong></span>|Affiche un tag|<strong>`WAITING FOR TEST`</strong>|
|`/admin/tag`|<span style="color:aqua"><strong>`POST`</strong></span>|Crée un tag|<strong>`WAITING FOR TEST`</strong>|
|`/admin/tag/:id`|<span style="color:orange"><strong>`PUT`</strong></span>|Modifie un tag|<strong>`WAITING FOR TEST`</strong>|
|`/admin/tag/:id`|<span style="color:red"><strong>`DELETE`</strong></span>|Supprime un tag|<strong>`WAITING FOR TEST`</strong>|