# PROJECT O'FRIGO BACK

# LISTE DES ROUTES

## <ins>ACCOUNT</ins>

### <span style="color:#32fc62"><strong>Public</strong></span>
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/register`|<span style="color:aqua"><strong>`POST`</strong></span>|Ajouter un compte|<span style="color:gold"><strong>`OK`</strong></span>|
|`/login`|<span style="color:aqua"><strong>`POST`</strong></span>|Se connecter|<span style="color:gold"><strong>`OK`</strong></span>| 

### <span style="color:#f0f"><strong>User</strong></span>
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/me/profile`|<span style="color:green"><strong>`GET`</strong></span>|Afficher les données utilisateur|<span style="color:gold"><strong>`OK`</strong></span>|
|`/me/profile`|<span style="color:orange"><strong>`PUT`</strong></span>|Modifier les données de l'utilisateur|<span style="color:gold"><strong>`OK`</strong></span>|
|`/me/profile`|<span style="color:red"><strong>`DELETE`</strong></span>|Supprimer son compte utilisateur|<span style="color:gold"><strong>`OK`</strong></span>|
|`/me/profile/ingredient`|<span style="color:aqua"><strong>`POST`</strong></span>|Ajouter un ingredient au compte utilisateur|<span style="color:gold"><strong>`OK`</strong></span>|
|`/me/profile/ingredient/:id`|<span style="color:red"><strong>`DELETE`</strong></span>|Supprimer un ingredient du compte utilisateur|<span style="color:gold"><strong>`OK`</strong></span>|

### <span style="color:gold"><strong>Admin</strong></span>
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/admin/register`|<span style="color:aqua"><strong>`GET`</strong></span>|Afficher à la page de création de compte|<span style="color:gold"><strong>`OK`</strong></span>|
|`/admin/register`|<span style="color:aqua"><strong>`POST`</strong></span>|Créer un compte admin|<span style="color:gold"><strong>`OK`</strong></span>|
|`/admin/login`|<span style="color:aqua"><strong>`GET`</strong></span>|Afficher à la page de connexion de l'admin|<span style="color:gold"><strong>`OK`</strong></span>|
|`/admin/login`|<span style="color:aqua"><strong>`POST`</strong></span>|Se connecter en tant qu'admin|<span style="color:gold"><strong>`OK`</strong></span>|
|`/admin/logout`|<span style="color:aqua"><strong>`POST`</strong></span>|Se déconnecter en tant qu'admin|<span style="color:gold"><strong>`OK`</strong></span>|
|`/admin/account`|<span style="color:green"><strong>`GET`</strong></span>|Afficher tous les comptes utilisateur|<span style="color:gold"><strong>`OK`</strong></span>|
|`/admin/account/:id`|<span style="color:green"><strong>`GET`</strong></span>|Afficher un compte utilisateur|<span style="color:gold"><strong>`OK`</strong></span>|
|`/admin/account/update/:id`|<span style="color:red"><strong>`GET`</strong></span>|Afficher à la page d'update d'un compte utilisateur|<span style="color:gold"><strong>`OK`</strong></span>|
|`/admin/account/update/:id`|<span style="color:red"><strong>`POST`</strong></span>|Modifier un compte utilisateur|<span style="color:gold"><strong>`OK`</strong></span>|
|`/admin/account/delete/:id`|<span style="color:red"><strong>`POST`</strong></span>|Supprimer un compte utilisateur|<span style="color:gold"><strong>`OK`</strong></span>|
|`/admin/account/:accountId/ingredient/:ingredientId`|<span style="color:red"><strong>`POST`</strong></span>|Supprimer un ingredient d'un compte utilisateur|<span style="color:gold"><strong>`OK`</strong></span>|
|`/admin/account/:accountId/message/:messageId`|<span style="color:red"><strong>`POST`</strong></span>|Supprimer un message d'un compte utilisateur|<span style="color:gold"><strong>`OK`</strong></span>|
|`/admin/:name`|<span style="color:red"><strong>`GET`</strong></span>|Afficher au profil de l'utilisateur admin|<span style="color:gold"><strong>`OK`</strong></span>|
---------------------------

## <ins>CATEGORY</ins>

### <span style="color:#32fc62"><strong>Public</strong></span>
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/category`|<span style="color:green"><strong>`GET`</strong></span>|Afficher toutes les categories|<span style="color:gold"><strong>`OK`</strong></span>|
|`/category/:id`|<span style="color:green"><strong>`GET`</strong></span>|Afficher une categorie|<span style="color:gold"><strong>`OK`</strong></span>|

### <span style="color:gold"><strong>Admin</strong></span>
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/admin/category`|<span style="color:green"><strong>`GET`</strong></span>|Afficher toutes les categories|<span style="color:gold"><strong>`OK`</strong></span>|
|`/admin/category/:id`| <span style="color:green"><strong>`GET`</strong></span>|Afficher une categorie|<span style="color:gold"><strong>`OK`</strong></span>|
|`/admin/category/create`|<span style="color:aqua"><strong>`GET`</strong></span>|Afficher la page de création d'une categorie|<span style="color:gold"><strong>`OK`</strong></span>|
|`/admin/category/create`|<span style="color:aqua"><strong>`POST`</strong></span>|Créer une categorie|<span style="color:gold"><strong>`OK`</strong></span>|
|`/admin/category/update/:id`|<span style="color:orange"><strong>`GET`</strong></span>|Afficher la page d'update d'une categorie|<span style="color:gold"><strong>`OK`</strong></span>|
|`/admin/category/update/:id`|<span style="color:orange"><strong>`POST`</strong></span>|Modifier une categorie|<span style="color:gold"><strong>`OK`</strong></span>|
|`/admin/category/delete/:id`|<span style="color:red"><strong>`POST`</strong></span>|Supprimer une categorie |<span style="color:gold"><strong>`OK`</strong></span>|
|`/admin/category/:categoryId/ingredient/:ingredientId`|<span style="color:red"><strong>`POST`</strong></span>|Supprimer un ingredient d'une categorie |<span style="color:gold"><strong>`OK`</strong></span>|

---------------------------

## <ins>INGREDIENT</ins>

### <span style="color:#32fc62"><strong>Public</strong></span>
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/ingredient`|<span style="color:green"><strong>`GET`</strong></span>|Afficher tous les ingrédients|<span style="color:gold"><strong>`OK`</strong></span>|
|`/ingredient/:id`|<span style="color:green"><strong>`GET`</strong></span>|Afficher un ingrédient|<span style="color:gold"><strong>`OK`</strong></span>|

### <span style="color:#f0f"><strong>User</strong></span>
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/me/profile/ingredient`|<span style="color:green"><strong>`GET`</strong></span>|Afficher tous les ingredients d'un utilisateur|<span style="color:gold"><strong>`OK`</strong></span>|
|`/me/profile/ingredient/:id`|<span style="color:green"><strong>`GET`</strong></span>|Afficher un ingredient d'un utilisateur|<span style="color:gold"><strong>`OK`</strong></span>|

### <span style="color:gold"><strong>Admin</strong></span>
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/admin/ingredient`|<span style="color:green"><strong>`GET`</strong></span>|Afficher tous les ingrédients|<span style="color:gold"><strong>`OK`</strong></span>|
|`/admin/ingredient/:id`|<span style="color:green"><strong>`GET`</strong></span>|Afficher un ingrédient|<span style="color:gold"><strong>`OK`</strong></span>|
|`/admin/ingredient/create`|<span style="color:aqua"><strong>`GET`</strong></span>|Afficher la page de création d'un ingrédient|<span style="color:gold"><strong>`OK`</strong></span>|
|`/admin/ingredient/create`|<span style="color:aqua"><strong>`POST`</strong></span>|Créer un ingrédient|<span style="color:gold"><strong>`OK`</strong></span>|
|`/admin/ingredient/update/:id`|<span style="color:orange"><strong>`GET`</strong></span>|Afficher la page de modification d'un ingrédient|<span style="color:gold"><strong>`OK`</strong></span>|
|`/admin/ingredient/update/:id`|<span style="color:orange"><strong>`POST`</strong></span>|Modifier un ingrédient|<span style="color:gold"><strong>`OK`</strong></span>|
|`/admin/ingredient/delete/:id`|<span style="color:red"><strong>`POST`</strong></span>|Supprimer un ingrédient|<span style="color:gold"><strong>`OK`</strong></span>|

---------------------------

## <ins>MESSAGE</ins>

### <span style="color:#32fc62"><strong>Public</strong></span>
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/contact`|<span style="color:aqua"><strong>`POST`</strong></span>|Envoyer un message En tant qu'anonyme|<span style="color:gold"><strong>`OK`</strong></span>|

### <span style="color:#f0f"><strong>User</strong></span>
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/me/profile/message`|<span style="color:green"><strong>`GET`</strong></span>|Afficher toutes les messages d'un utilisateur|<span style="color:gold"><strong>`OK`</strong></span>|
|`/me/profile/message/:id`|<span style="color:green"><strong>`GET`</strong></span>|Afficher un message d'un utilisateur|<span style="color:gold"><strong>`OK`</strong></span>|
|`/me/profile/contact`|<span style="color:aqua"><strong>`POST`</strong></span>|Envoyer un message en tant qu'utilisateur|<span style="color:gold"><strong>`OK`</strong></span>|
|`/me/profile/message/:id`|<span style="color:orange"><strong>`PUT`</strong></span>|Modifier un message de l'utilisateur|<span style="color:gold"><strong>`OK`</strong></span>|
|`/me/profile/message/:id`|<span style="color:red"><strong>`DELETE`</strong></span>|Supprimer un message de l'utilisateur|<span style="color:gold"><strong>`OK`</strong></span>|

### <span style="color:gold"><strong>Admin</strong></span>
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/admin/message`|<span style="color:green"><strong>`GET`</strong></span>|Afficher tous les messages|<span style="color:gold"><strong>`OK`</strong></span>|
|`/admin/message/:id`|<span style="color:green"><strong>`GET`</strong></span>|Afficher un message|<span style="color:gold"><strong>`OK`</strong></span>|
|`/admin/message/create`|<span style="color:aqua"><strong>`GET`</strong></span>|Afficher la page de création d'un message en tant qu'admin|<span style="color:gold"><strong>`OK`</strong></span>|
|`/admin/message/create`|<span style="color:aqua"><strong>`POST`</strong></span>|Envoyer un message en tant qu'admin|<span style="color:gold"><strong>`OK`</strong></span>|
|`/admin/message/update/:id`|<span style="color:orange"><strong>`GET`</strong></span>|Afficher la page de modification d'un message en tant qu'admin|<span style="color:gold"><strong>`OK`</strong></span>|
|`/admin/message/update/:id`|<span style="color:orange"><strong>`POST`</strong></span>|Modifier un message de l'admin connecté|<span style="color:gold"><strong>`OK`</strong></span>|
|`/admin/message/delete/:id`|<span style="color:red"><strong>`POST`</strong></span>|Supprimer un message de l'admin|<span style="color:gold"><strong>`OK`</strong></span>|

---------------------------

## <ins>RECIPE</ins>

### <span style="color:#32fc62"><strong>Public</strong></span>
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/recipe`|<span style="color:green"><strong>`GET`</strong></span>|Afficher toutes les recettes|<span style="color:gold"><strong>`OK`</strong></span>|
|`/recipe/:id`|<span style="color:green"><strong>`GET`</strong></span>|Afficher une recette|<span style="color:gold"><strong>`OK`</strong></span>|

### <span style="color:gold"><strong>Admin</strong></span>
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/admin/recipe`|<span style="color:green"><strong>`GET`</strong></span>|Afficher toutes les recettes|<span style="color:gold"><strong>`OK`</strong></span>|
|`/admin/recipe/:id`|<span style="color:green"><strong>`GET`</strong></span>|Afficher une recette|<span style="color:gold"><strong>`OK`</strong></span>|
|`/admin/recipe/create`|<span style="color:aqua"><strong>`GET`</strong></span>|Afficher la page de création d'une recette|<strong>`WAITING FOR TEST`</strong>|
|`/admin/recipe/create`|<span style="color:aqua"><strong>`POST`</strong></span>|Créer une recette|<strong>`WAITING FOR TEST`</strong>|
|`/admin/recipe/update/:id`|<span style="color:orange"><strong>`GET`</strong></span>|Afficher la page de modification d'une recette|<strong>`WAITING FOR TEST`</strong>|
|`/admin/recipe/update/:id`|<span style="color:orange"><strong>`POST`</strong></span>|Modifier une recette|<strong>`WAITING FOR TEST`</strong>|
|`/admin/recipe/delete/:id`|<span style="color:red"><strong>`POST`</strong></span>|Supprimer une recette|<span style="color:gold"><strong>`OK`</strong></span>|
|`/admin/recipe/:recipeId/ingredient/:ingredientId`|<span style="color:red"><strong>`POST`</strong></span>|Supprimer un ingredient d'une recette|<span style="color:gold"><strong>`OK`</strong></span>|
|`/admin/recipe/:recipeId/tag/:tagId`|<span style="color:red"><strong>`POST`</strong></span>|Supprimer un tag d'une recette|<span style="color:gold"><strong>`OK`</strong></span>|
|`/admin/recipe/:recipeId/step/:stepId`|<span style="color:red"><strong>`POST`</strong></span>|Supprimer une étape d'une recette|<span style="color:gold"><strong>`OK`</strong></span>|

---------------------------

## <ins>TAG</ins>

### <span style="color:#32fc62"><strong>Public</strong></span>
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/tag`|<span style="color:green"><strong>`GET`</strong></span>|Afficher tous les tags|<span style="color:gold"><strong>`OK`</strong></span>|
|`/tag/:id`|<span style="color:green"><strong>`GET`</strong></span>|Afficher un tag|<span style="color:gold"><strong>`OK`</strong></span>|

### <span style="color:gold"><strong>Admin</strong></span>
|ROUTE|VERB|DESCRIPTION|STATUT|
|---|---|---|---|
|`/admin/tag`|<span style="color:green"><strong>`GET`</strong></span>|Afficher tous les tags|<span style="color:gold"><strong>`OK`</strong></span>|
|`/admin/tag/:id`|<span style="color:green"><strong>`GET`</strong></span>|Afficher un tag|<span style="color:gold"><strong>`OK`</strong></span>|
|`/admin/tag/create`|<span style="color:aqua"><strong>`GET`</strong></span>|Afficher la page de création d'un tag|<span style="color:gold"><strong>`OK`</strong></span>|
|`/admin/tag/create`|<span style="color:aqua"><strong>`POST`</strong></span>|Créer un tag|<span style="color:gold"><strong>`OK`</strong></span>|
|`/admin/tag/update/:id`|<span style="color:orange"><strong>`GET`</strong></span>|Afficher la page de modification d'un tag|<span style="color:gold"><strong>`OK`</strong></span>|
|`/admin/tag/update/:id`|<span style="color:orange"><strong>`POST`</strong></span>|Modifier un tag|<span style="color:gold"><strong>`OK`</strong></span>|
|`/admin/tag/delete/:id`|<span style="color:red"><strong>`POST`</strong></span>|Supprimer un tag|<span style="color:gold"><strong>`OK`</strong></span>|
|`/admin/tag/:tagId/recipe/:recipeId`|<span style="color:red"><strong>`POST`</strong></span>|Supprimer une recette d'un tag|<span style="color:gold"><strong>`OK`</strong></span>|

---------------------------

# Evolutions possibles


|ETAPE|STATUT|
|---|---|
Test unitaires| En cours|
Fonctionalité : Création d’une recette | En cours|
Fonctionalité : Modification d’une recette | En cours|