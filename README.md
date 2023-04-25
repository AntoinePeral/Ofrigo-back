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
|`/:me/profile`|<span style="color:green"><strong>`GET`</strong></span>|Afficher les données utilisateur|<span style="color:gold"><strong>`OK`</strong></span>|
|`/:me/profile`|<span style="color:orange"><strong>`PUT`</strong></span>|Modifier les données de l'utilisateur|<span style="color:gold"><strong>`OK`</strong></span>|
|`/:me/profile`|<span style="color:red"><strong>`DELETE`</strong></span>|Supprimer son compte utilisateur|<span style="color:gold"><strong>`OK`</strong></span>|
|`/:me/profile/ingredient`|<span style="color:aqua"><strong>`POST`</strong></span>|Ajouter un ingredient au compte utilisateur|<span style="color:gold"><strong>`OK`</strong></span>|
|`/:me/profile/ingredient/:id`|<span style="color:red"><strong>`DELETE`</strong></span>|Supprimer un ingredient du compte utilisateur|<span style="color:gold"><strong>`OK`</strong></span>|

### Admin
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/admin/login`|<span style="color:aqua"><strong>`POST`</strong></span>|Se connecter en tant qu'admin|<strong>`WAITING FOR TEST`</strong>|
|`/admin/profile`|<span style="color:green"><strong>`GET`</strong></span>|Afficher tous les comptes utilisateur|<strong>`WAITING FOR TEST`</strong>|
|`/admin/profile/:id`|<span style="color:green"><strong>`GET`</strong></span>|Afficher un compte utilisateur|<strong>`WAITING FOR TEST`</strong>|
|`/admin/profile/:id`|<span style="color:red"><strong>`DELETE`</strong></span>|Supprimer un compte utilisateur|<strong>`WAITING FOR TEST`</strong>|

## <ins>CATEGORY</ins>

### Public
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/category`|<span style="color:green"><strong>`GET`</strong></span>|Afficher toutes les categories|<span style="color:gold"><strong>`OK`</strong></span>|
|`/category/:id`|<span style="color:green"><strong>`GET`</strong></span>|Afficher une categorie|<span style="color:gold"><strong>`OK`</strong></span>|

### Admin
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/admin/category`|<span style="color:green"><strong>`GET`</strong></span>|Afficher toutes les categories|<strong>`WAITING FOR TEST`</strong>|
|`/admin/category/:id`| <span style="color:green"><strong>`GET`</strong></span>|Afficher une categorie|<strong>`WAITING FOR TEST`</strong>|
|`/admin/category`|<span style="color:aqua"><strong>`POST`</strong></span>|Créer une categorie|<strong>`WAITING FOR TEST`</strong>|
|`/admin/category/:id`|<span style="color:orange"><strong>`PUT`</strong></span>|Modifier une categorie|<strong>`WAITING FOR TEST`</strong>|
|`/admin/category/:id`|<span style="color:red"><strong>`DELETE`</strong></span>|Supprimer une categorie |<strong>`WAITING FOR TEST`</strong>|

## <ins>INGREDIENT</ins>

### Public
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/ingredient`|<span style="color:green"><strong>`GET`</strong></span>|Afficher tous les ingrédients|<span style="color:gold"><strong>`OK`</strong></span>|
|`/ingredient/:id`|<span style="color:green"><strong>`GET`</strong></span>|Afficher un ingrédient|<span style="color:gold"><strong>`OK`</strong></span>|

### User
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/:me/profile/ingredient`|<span style="color:green"><strong>`GET`</strong></span>|Afficher tous les ingredients d'un utilisateur|<span style="color:gold"><strong>`OK`</strong></span>|
|`/:me/profile/:id`|<span style="color:green"><strong>`GET`</strong></span>|Afficher un ingredient d'un utilisateur|<span style="color:gold"><strong>`OK`</strong></span>|

### Admin
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/admin/ingredient`|<span style="color:green"><strong>`GET`</strong></span>|Afficher tous les ingrédients|<strong>`WAITING FOR TEST`</strong>|
|`/admin/ingredient/:id`|<span style="color:green"><strong>`GET`</strong></span>|Afficher un ingrédient|<strong>`WAITING FOR TEST`</strong>|
|`/admin/ingredient`|<span style="color:aqua"><strong>`POST`</strong></span>|Créer un ingrédient|<strong>`WAITING FOR TEST`</strong>|
|`/admin/ingredient`|<span style="color:orange"><strong>`PUT`</strong></span>|Modifier un ingrédient|<strong>`WAITING FOR TEST`</strong>|
|`/admin/ingredient`|<span style="color:red"><strong>`DELETE`</strong></span>|Supprimer un ingrédient|<strong>`WAITING FOR TEST`</strong>|

## <ins>MESSAGE</ins>

### Public
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/contact`|<span style="color:aqua"><strong>`POST`</strong></span>|Envoyer un message|<span style="color:gold"><strong>`OK`</strong></span>|

### User
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/:me/profile/message`|<span style="color:green"><strong>`GET`</strong></span>|Afficher toutes les messages d'un utilisateur|<span style="color:gold"><strong>`OK`</strong></span>|
|`/:me/profile/message/:id`|<span style="color:green"><strong>`GET`</strong></span>|Afficher un message d'un utilisateur|<span style="color:gold"><strong>`OK`</strong></span>|
|`/:me/profile/contact`|<span style="color:aqua"><strong>`POST`</strong></span>|Envoyer un message en tant qu'utilisateur|<span style="color:gold"><strong>`OK`</strong></span>|
|`/:me/profile/message/:id`|<span style="color:orange"><strong>`PUT`</strong></span>|Modifier un message de l'utilisateur|<span style="color:gold"><strong>`OK`</strong></span>|
|`/:me/profile/message/:id`|<span style="color:red"><strong>`DELETE`</strong></span>|Supprimer un message de l'utilisateur|<span style="color:gold"><strong>`OK`</strong></span>|

### Admin
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/admin/message`|<span style="color:green"><strong>`GET`</strong></span>|Afficher tous les messages|<strong>`WAITING FOR TEST`</strong>|
|`/admin/message/:id`|<span style="color:green"><strong>`GET`</strong></span>|Afficher un message|<strong>`WAITING FOR TEST`</strong>|
|`/admin/contact`|<span style="color:aqua"><strong>`POST`</strong></span>|Envoyer un message en tant qu'admin|<strong>`WAITING FOR TEST`</strong>|
|`/admin/message/:id`|<span style="color:orange"><strong>`PUT`</strong></span>|Modifier un message d'un admin|<strong>`WAITING FOR TEST`</strong>|
|`/admin/message/:id`|<span style="color:red"><strong>`DELETE`</strong></span>|Supprimer un message de l'admin|<strong>`WAITING FOR TEST`</strong>|

## <ins>RECIPE</ins>

### Public
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/recipe`|<span style="color:green"><strong>`GET`</strong></span>|Afficher toutes les recettes|<span style="color:gold"><strong>`OK`</strong></span>|
|`/recipe/:id`|<span style="color:green"><strong>`GET`</strong></span>|Afficher une recette|<span style="color:gold"><strong>`OK`</strong></span>|

### Admin
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/admin/recipe`|<span style="color:green"><strong>`GET`</strong></span>|Afficher toutes les recettes|<strong>`WAITING FOR TEST`</strong>|
|`/admin/recipe/:id`|<span style="color:green"><strong>`GET`</strong></span>|Afficher une recette|<strong>`WAITING FOR TEST`</strong>|
|`/admin/recipe`|<span style="color:aqua"><strong>`POST`</strong></span>|Créer une recette|<strong>`WAITING FOR TEST`</strong>|
|`/admin/recipe/:id`|<span style="color:orange"><strong>`PUT`</strong></span>|Modifier une recette|<strong>`WAITING FOR TEST`</strong>|
|`/admin/recipe/:id`|<span style="color:red"><strong>`DELETE`</strong></span>|Supprimer une recette|<strong>`WAITING FOR TEST`</strong>|

## <ins>TAG</ins>

### Public
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/tag`|<span style="color:green"><strong>`GET`</strong></span>|Afficher tous les tags|<span style="color:gold"><strong>`OK`</strong></span>|
|`/tag/:id`|<span style="color:green"><strong>`GET`</strong></span>|Afficher un tag|<span style="color:gold"><strong>`OK`</strong></span>|

### Admin
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/admin/tag`|<span style="color:green"><strong>`GET`</strong></span>|Afficher tous les tags|<strong>`WAITING FOR TEST`</strong>|
|`/admin/tag/:id`|<span style="color:green"><strong>`GET`</strong></span>|Afficher un tag|<strong>`WAITING FOR TEST`</strong>|
|`/admin/tag`|<span style="color:aqua"><strong>`POST`</strong></span>|Créer un tag|<strong>`WAITING FOR TEST`</strong>|
|`/admin/tag/:id`|<span style="color:orange"><strong>`PUT`</strong></span>|Modifier un tag|<strong>`WAITING FOR TEST`</strong>|
|`/admin/tag/:id`|<span style="color:red"><strong>`DELETE`</strong></span>|Supprimer un tag|<strong>`WAITING FOR TEST`</strong>|