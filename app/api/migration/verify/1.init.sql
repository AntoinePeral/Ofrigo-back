-- Verify ofrigo:1.init on pg

BEGIN;

--AFFICHE TOUTE LES COMPTES UTILISATEUR
SELECT * FROM account

--AFFICHE TOUS LES MESSAGE
SELECT * FROM message

--AFFICHE TOUS LES INGREDIENTS
SELECT * FROM ingredient

--AFFICHE TOUTES LES RECETTES
SELECT * FROM recipe

--AFFICHE TOUTES LES ETAPES
SELECT * FROM step

--AFFICHE TOUS LES TAGS
SELECT * FROM tag

--TABLE DE LIAISON 1
SELECT * FROM account_has_ingredient

--TABLE DE LIAISON 2
SELECT * FROM recipe_has_ingredient_with_quantity

--TABLE DE LIAISON 3
SELECT * FROM recipe_has_tag

ROLLBACK;
