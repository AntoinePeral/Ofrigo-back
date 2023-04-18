-- Verify ofrigo:2.insert on pg

BEGIN;

--AFFICHE LE COMPTE UTILISATEUR 1
SELECT * FROM account WHERE account.id=1;

--AFFICHE LE MESSAGE 1
SELECT * FROM message WHERE message.id=1;

--AFFICHE L'INGREDIENTS 1
SELECT * FROM ingredient WHERE ingredient.id=1;

--AFFICHE LA RECETTE 1
SELECT * FROM recipe WHERE recipe.id=1;

--AFFICHE L'ETAPE 1
SELECT * FROM step WHERE step.id=1;

--AFFICHE LE TAG 1
SELECT * FROM tag WHERE tag.id=1;

ROLLBACK;
