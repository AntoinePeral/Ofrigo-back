-- Deploy ofrigo:2.insert to pg

BEGIN;

INSERT INTO account(last_name, first_name, email, password, role) VALUES
('Lienard', 'Kevin', 'kevin@gmail.com', 'Password123!', 'admin'),
('Peral', 'Antoine', 'antoine@gmail.com', 'TotoVAalaplage32?', 'user');

INSERT INTO message(label, content, email) VALUES
('message 1', 'Ceci est un test', 'antoine@gmail.com'),
('message 2', 'Ceci est un test', 'kevin@gmail.com');

INSERT INTO category(label) VALUES
('Légumes'),
('Poissons'),
('Viandes'),
('Fruits'),
('Epicerie'),
('Crémerie'),
('Fruits de mer'),
('Oeufs'),
('Céréale');

INSERT INTO ingredient(label, unit, category_id) VALUES
('Farine', 'mg', 5),
('Levure chimique', 'paquet', 5),
('Beurre', 'mg', 6),
('Banane', null, 4),
('Chocolat', 'mg', 5),
('Cardamome', 'pincée', 5),
('Cassonade', 'mg', 5),
('Oeuf', null, 8),
('Lait', 'ml', 6),
('Sel', 'pincée', 5),
('Sucre en poudre', 'mg', 5),
('Grand-marnier ou de rhum', null, 5),
('Pralin', 'pincée', 5),
('Glace vanille', 'boule', 6),
('Pâte brisée', 'rouleau', 5),
('Crème fraîche', 'mg', 6),
('Lardons', 'mg', 3),
('Poivre', 'pincée', 5),
('Muscade', null, 5),
('Fond de veau', 'ml', 5),
('Comté', 'mg', 6),
('Maïzena', null, 5),
('Bar', 'mg', 2),
('Chorizo', 'mg', 3),
('Chapelure', 'mg', 5),
('Carotte', 'mg', 1),
('Courgette', null, 1),
('Cumin', 'c.à.s', 5),
('Patate douce', 'c.à.s', 1),
('Echalotes', null, 1),
('Ail', 'gousse', 1),
('Crème coco', 'ml', 6),
('Pâte de curry rouge', 'mg', 5),
('Concentré de tomate', 'c.à.s', 5),
('Citron vertes', null, 1),
('Oignon', null, 1),
('Huile d''olive', 'c.à.s', 5),
('Lentilles vertes', 'mg', 1),
('Curry', 'c.à.c', 5),
('Cube de bouillon de poule', null, 5),
('Laurier', 'feuille', 5),
('Potimarron', null, 1),
('Pomme de terre', null, 1),
('Poivron', null, 1),
('Tomate', 'mg', 1),
('Safran', 'dose', 5),
('Riz', 'mg', 9),
('Filet de poulet', 'mg', 3),
('Calamar', 'mg', 2),
('Moule', 'ml', 7),
('Crevette', null, 7),
('Melon', null, 4),
('Thym', 'c.à.c', 5),
('Eau', 'c.à.s', 5),
('Salade', 'coeur', 1),
('Feta', 'mg', 6),
('Jambon cru', 'tranche', 3),
('Jus de citron', 'c.à.s', 5),
('Moutarde', 'c.à.s', 5),
('Cheddar', 'mg', 6),
('Bière brune', 'ml', 5),
('Pain de campagne', null, 9),
('Jambon blanc', 'tranche', 3),
('Chocolat noir', 'mg', 5),
('Sucre semoule', 'mg', 5),
('Fromage ail et fines herbes', null, 6),
('Fajitas', null, 9),
('Penne', 'mg', 9),
('Herbe de provence', null, 5);

INSERT INTO recipe(label, picture, rate, difficulty, time) VALUES
('Cake du petit-déjeuner banane-chocolat', 'Cake-banane-chocolat.jpg', 4.4, 'Très facile', '45 min'),
('Pâte à crêpes (des plus raffinées)', 'Crepes.jpg', 4.7, 'Facile', '17 min'),
('Bowl cake moelleux chocolat noisettes', 'Bowl-cake-moelleux-chocolat-noisettes.jpg', 4.5, 'Très facile', '13 min'),
('Quiche lorraine traditionnelle', 'Quiche-Lorraine.jpg', 4.8, 'Très facile', '35 min'),
('Filet de bar en croûte de chorizo, purée et mousse de haricots cocos de Paimpol', 'Filet-de-bar-en-croûte.jpg', 4.2, 'Moyenne', '2 h 30 min'),
('Curry de légumes végétarien', 'Curry-de-légume-végétarien.jpg', 4.8, 'Très facile', '1 h 20 min'),
('Burger végétarien aux lentilles', 'Burger-vegétarien.jpg', 5, 'Très facile', '55 min'),
('Soupe veloutée de potimarron et pommes de terre', 'Soupe-potimarron.jpg', 4.9, 'Très facile', '45 min'),
('Paëlla fruits de mer, chorizo et poulet de Patou', 'Paella-fruit-de-mer-chorizo.jpg', 4.8, 'Facile', '1 h 10 min'),
('Salade melon, feta, jambon', 'Salade-melon-feta.jpg', 4.8, 'Très facile', '15 min'),
('Welsh traditionnel à la bière brune', 'Wesh-traditionnel.jpg', 4.3, 'Moyenne', '40 min'),
('Crème dessert facile au chocolat', 'Creme-dessert.jpg', 4.6, 'Très facile', '15 min'),
('Pancake Moelleux : recette facile', 'Pancake.jpg', 4.8, 'Très facile', '14 min'),
('Roulé de jambon original pour apéro', 'Roulé-jambon.jpg', 4.8, 'Très facile', '20 min'),
('Gratin de pâtes au chorizo', 'Gratin-de-pates-et-chorizo.jpg', 4.5, 'Facile', '55 min');

INSERT INTO step(content, number, recipe_id) VALUES
('Préchauffer le four à 220°C (thermostat 7).', 1, 1),
('Dans un saladier, mélanger la farine, la levure, la cassonade, l''oeuf, le beurre, la banane coupée en petits dés, le chocolat coupés en pépites, le lait et la cardamome.', 2, 1),
('Verser dans un plat à cake souple de préférence et enfourner pour 30 minutes.', 3, 1),
('Au bout de ce temps, la pointe du couteau plantée dans le cake doit ressortir sèche !', 4, 1),
('Dans un saladier, mélanger la farine, le sel et le sucre.', 1, 2),
('Faire une fontaine.', 2, 2),
('Ajouter les oeufs et commencer à les incorporer à la farine avec une cuillère en bois, ajouter le beure fondu (tiédi) peu à peu et bien malaxer.', 3, 2),
('Incorporer le lait (par petites quantités au début pour éviter les grumeaux), ajouter le parfum.', 4, 2),
('Faire cuire les crêpes dans une poêle chaude huilée.', 5, 2),
('Dans un bol (de la taille du moelleux souhaité) couper le chocolat en morceaux et faire fondre avec le lait au micro-ondes.', 1, 3),
('Mélanger avec une fourchette jusqu''à ce que le chocolat soit bien fondu.', 2, 3),
('Ajouter le sucre, les oeufs et la purée de noisettes et bien mélanger.', 3, 3),
('Ajouter la poudre de noisettes et la levure. Mélanger jusqu''à l''obtention d''un mélange homogène.', 4, 3),
('Cuire 2min30 au micro-ondes.', 5, 3),
('Le dessus du moelleux doit être tout juste cuit, si besoin, remettre 30 secondes de cuisson.', 6, 3),
('Pour démouler, renverser le bol et servir encore chaud avec une boule de glace et une pincée de pralin.', 7, 3),
('Pré-chauffer le four à 200°C (thermostat 6-7). Dérouler la pâte brisée et la placer dans un plat à tarte. Piquer le fond avec une fourchette.', 1, 4),
('Faire dorer les lardons.', 2, 4),
('Pendant ce temps, mélanger les oeufs battus et la crème fraîche.', 3, 4),
('Une fois les lardons dorés, les mélanger à la préparation aux oeufs.', 4, 4),
('Saler, poivrer, et ajouter la muscade selon votre convenance.', 5, 4),
('Verser la préparation sur le fond de pâte.', 6, 4),
('Mettre au four pendant 30 min.', 7, 4),
('Préparez la croûte de chorizo : détaillez-en 50 g très finement à l’aide d’un couteau ou d’un robot ménager.', 1, 5),
('Mélangez le fromage râpé, la chapelure et le chorizo.', 2, 5),
('Ajoutez le beurre à l’aide d’une fourchette, rectifiez l''assaisonnement et roulez en boule.', 3, 5),
('Entreposez au réfrigérateur pendant quelques heures.', 4, 5),
('Par ailleurs, faites sécher 4 tranches de chorizo, sur une grille à pâtisserie, au four préchauffé à 80°C : les tranches doivent sécher et devenir croustillantes.', 5, 5),
('Réservez sur une grille.', 6, 5),
('Selon le conditionnement des cocos (bocal ou sec), réhydratez-les selon les indications de l’emballage et faites-les cuire ou réchauffer.', 7, 5),
('Par ailleurs, coupez le reste de chorizo en morceaux et mettez-les dans un poêlon avec le fond de veau.', 8, 5),
('Faites réduire de ¾ et passez le jus restant au chinois fin.', 9, 5),
('Réservez la moitié des haricots et passez le reste au robot ménager avec un peu de crème fraîche et de lait afin d’obtenir une purée très fine (adaptez la quantité pour obtenir une purée bien lisse et onctueuse).', 10, 5),
('Passez la purée au chinois fin.', 11, 5),
('Assaisonnez de noix de muscade, de poivre et de sel.', 12, 5),
('La purée doit être lisse et sans grumeaux.', 13, 5),
('Rectifiez l''assaisonnement.', 14, 5),
('Découpez le filet de poisson en 4 morceaux égaux.', 15, 5),
('Réservez au frais.', 16, 5),
('Retirez la pâte du réfrigérateur, laissez-la se détendre un peu et abaissez-la au rouleau à environ 3 mm entre 2 feuilles de papier cuisson.', 17, 5),
('Découpez cette abaisse aux dimensions des morceaux de poissons.', 18, 5),
('Préchauffez le four à 180°C (thermostat 6).', 19, 5),
('Disposez les morceaux de poisson dans un plat beurré, salez, poivrez et enfournez-les.', 20, 5),
('Faites cuire environ 10 minutes.', 21, 5),
('Retirez du four et laissez refroidir un peu.', 22, 5),
('Disposez les tranches de préparation sur les morceaux de poissons.', 23, 5),
('Remettez au four, en position grill et laissez colorer la croûte.', 24, 5),
('Réchauffez la sauce et ajoutez, le cas échéant, un peu de maïzena à la réduction de fond de veau et montez la sauce au beurre.', 25, 5),
('Versez les cocos entiers dans un poêlon avec un peu de beurre, salez, poivrez et faites-les réchauffer à feu doux.', 26, 5),
('Versez la crème de coco dans un siphon préalablement chauffé à l’eau.', 27, 5),
('Fermez et vissez 2 cartouches de gaz.', 28, 5),
('Si vous ne disposez pas d’un siphon, versez simplement la crème de cocos à l’aide d’ une cuillère à soupe.', 29, 5),
('Versez 2 cuillères à soupe de cocos au centre de l’assiette, disposez un morceau de poisson couvert de croûte dessus.', 30, 5),
('Versez le fond réduit d’un côté et siphonné un peu de crème de coco de l’autre.', 31, 5),
('Décorez d’une tranche de chorizo séchée.', 32, 5),
('Débiter les carottes en fines tranches et la patate en petits morceaux. Découper les courgettes en quarts de rondelles tout en conservant la peau.', 1, 6),
('Détailler les échalotes et l''ail et les faire dorer dans une grande sauteuse avec un peu d''huile. Ajouter les légumes, réduire le feu et couvrir.', 2, 6),
('En parallèle, dans un saladier, mélanger la crème de coco, le concentré de tomates et la pâte de curry avec le jus des citrons verts. Ajouter le piment et le basilic moulus, le cumin, et napper les légumes de ce mélange bien homogène. Ajouter 1/2 verre d''eau.', 3, 6),
('Poivrer et saler à discrétion.', 4, 6),
('Bien laisser mijoter sous couvercle à feu minimum.', 5, 6),
('Faire cuire les lentilles pendant 20 min (départ à froid) et laisser refroidir.', 1, 7),
('Préchauffer le four à 200°C (thermostat 6-7).', 2, 7),
('Éplucher et râpée la carotte.', 3, 7),
('Émincer l''oignon et le faire revenir dans la poêle avec l''huile d''olive.', 4, 7),
('Au bout de 5 minutes ajouter la carotte et le cumin.', 5, 7),
('Laisser mijoter.', 6, 7),
('Dans un saladier, écraser les lentilles avec le concentré de tomates.', 7, 7),
('Ajouter le mélange oignon / carotte, l''oeuf, la chapelure, saler et poivrer. Bien mélanger.', 8, 7),
('Former des galettes et les disposer sur une plaque recouverte de papier cuisson.', 9, 7),
('Enfourner 30 minutes et retourner à mi-cuisson.', 10, 7),
('Toaster les pains à burger.', 11, 7),
('Tartiner les pains de mayonnaise, déposer une feuille de salade, une galette de lentilles et un morceau de fromage. Refermer le burger avec le pain badigeonner de ketchup.', 12, 7),
('Enlever l''écorce et les pépins du potimarron (il n''est pas obligatoire de le peler, mais dans ce cas, le choisir bio et bien le laver) puis couper la chair en gros morceaux.', 1, 8),
('Eplucher les pommes de terre puis les couper en gros morceaux.', 2, 8),
('Faire revenir les oignons et l''ail hachés dans un peu de beurre à feu doux.', 3, 8),
('Ajouter les pommes de terre et le potimarron, faire revenir 5 min.', 4, 8),
('Couvrir le tout d''eau, ajouter le bouillon de poule (émietté), le curry, la muscade, la feuille de laurier et laisser mijoter environ 30 min à feu doux.', 5, 8),
('Lorsque les légumes sont cuits (vérifier à l''aide d''un couteau), mixer votre préparation.', 6, 8),
('Vérifier l''assaisonnement, saler, poivrer selon votre goût puis ajouter la crème fraîche et laisser mijoter encore 2 ou 3 min. Bon appétit !', 7, 8),
('Découper le poulet en morceaux, nettoyer les moules, émincer le chorizo et les poivrons, peler et concasser les tomates, hacher les oignons et l''ail.', 1, 9),
('Mettre l''huile dans le plat et faire dorer les morceaux de poulet. Ajouter les calamars, les oignons tout en remuant puis mettre les tomates, les poivrons, l''ail, le safran, le sel et le poivre. Laisser cuire 5 minutes en remuant avant d''incorporer le riz, le chorizo et le bouillon.', 2, 9),
('Y plonger les crevettes et les moules, porter à ébullition puis laisser cuire environ 30-35 minutes.', 3, 9),
('Eplucher le melon, et couper la chair en petits cubes.', 1, 10),
('Couper les tranches de jambon cru en fines lanières.', 2, 10),
('Couper la feta en cubes.', 3, 10),
('Pour la sauce : verser le jus de citron dans un bol, saler, poivrer (allonger d''eau si désiré); bien mélanger.', 4, 10),
('Ajouter l''huile d''olive, mélanger énergiquement, afin d''obtenir une belle émulsion et incorporer le thym.', 5, 10),
('Mettre la salade, le melon, le jambon, la feta et la sauce dans un saladier, et remuer juste avant de servir.', 6, 10),
('Couper le cheddar en petits cubes. Couper le pain en tranches bien épaisses. Faire en sorte qu’au niveau largeur elles passent dans les plats à welsh. Dans la limite du possible garder la croute des tartines.', 1, 11),
('Verser quelques goutes de bière sur chaque tartine (vraiment quelques gouttes, il faut garder environ 20 cl pour le reste de la recette). Puis les badigeonner d’un peu de moutarde (environ 2 cuillères à soupe) et les placer dans le fond des plats.', 2, 11),
('Poser sur chaque tartine une tranche de jambon recourbée sur elle-même.', 3, 11),
('Dans une grande sauteuse, faire fondre les cubes de cheddar sans ajouter de matière grasse.', 4, 11),
('Mélanger constamment à l’aide d’une cuillère en bois (ça fait des fils, c’est normal tant que ça n’attache pas à la sauteuse).', 5, 11),
('Quand la consistance est relativement homogène et qu’elle recouvre bien la cuillère quand on mélange, ajouter toute la bière et continuer à mélanger. Il faut remuer sans arrêt de façon à bien incorporer la bière au fromage.', 6, 11),
('Une fois le tout bien homogène et onctueux, ajouter le reste de la moutarde, un peu de poivre et remuer encore.', 7, 11),
('Quand la préparation est homogène, la verser dans les plats pour napper les tartines au jambon. Enfourner à 210°C (thermostat 7) pour une 10-12 minutes (il faut que ce soit bien doré).', 8, 11),
('Pendant ce temps cuire les 4 oeufs au plat dans une poêle (il est aussi possible de les faire au four, directement sur les Welshs, mais la cuisson du jaune est très délicate. C''est pourquoi à la poêle c''est très bien).', 9, 11),
('Quand le fromage est bien doré, sortir les plats du four, placer un oeuf au plat sur le dessus de chacun d’entre eux, tourner un coup de moulin à poivre et servir rapidement avec des frites et/ou de la salade verte. Et surtout une bière !', 10, 11),
('Mélanger farine et beurre fondu comme une béchamel, ajouter le lait bien mélanger. Ajouter le sucre après la cuisson du lait dans le roux blanc, puis mélanger à nouveau.', 1, 12),
('Ajouter le chocolat cassé en petit morceaux, laisser chauffer 5 à 10 min, mélanger en faisant des 8 avec la cuillère en bois.', 2, 12),
('Mettre dans des petits pots et réserver au frais.', 3, 12),
('NDSissi : au vu des commentaires, je pense que je n''ai pas assez précisé que la préparation devait bouillonner quelques minutes, une fois le chocolat ajouté, en tournant avec la cuillère en bois... C''est là que la crème prend sa consistance, qui ne sera absolument pas liquide, mais qui n''est pas un flan non plus. La qualité gustative dépend de la qualité du chocolat utilisé bien sûr.', 4, 12),
('Avec 1 litre de lait, on fait 8 petits pots comme sur la photo.', 5, 12),
('On peut diviser les ingrédients par deux pour faire 4 petits pots , Ceci reste cependant un petit dessert familial qui se bonifie au frigo, meilleur encore 3 jours plus tard.', 6, 12),
('Faire fondre le beurre, dans une casserole à feu doux ou dans un bol au micro-ondes.', 1, 13),
('Mettre la farine, la levure et le sucre dans un saladier. Mélanger et creuser un puits.', 2, 13),
('Ajouter ensuite les oeufs entiers et fouetter l''ensemble.', 3, 13),
('Incorporer le beurre fondu, fouetter puis délayer progressivement le mélange avec le lait afin d''éviter les grumeaux.', 4, 13),
('Laisser reposer la pâte au minimum 1 heure au réfrigérateur.', 5, 13),
('Dans une poêle chaude et légèrement huilée, faire cuire comme des crêpes, mais en les faisant plus petites. Réserver au chaud et déguster.', 6, 13),
('Sur chaque fajita, étaler du fromage ail et fines herbes. N''hésitez pas à tartiner car sinon, c''est trop sec.', 1, 14),
('Poser ensuite au milieu la tranche de jambon et par dessus, un peu de salade.', 2, 14),
('Rouler délicatement et couper en petits tronçons que vous maintiendrez avec les piques en bois.', 3, 14),
('Laisser au frais jusqu''à l''apéritif sous film plastique.', 4, 14),
('Couper le chorizo en fines rondelles et le faire "dégorger" à feu moyen dans un cocotte.', 1, 15),
('Egoutter le chorizo et y rajouter oignon émincé, sel, poivre et herbes de provence.', 2, 15),
('Faire revenir à feu vif pendant 5 minutes. Rajouter les tomates coupées en dés.', 3, 15),
('Laisser cuire 5 minutes. rajouter le jambon émincé et le concentré de tomates.', 4, 15),
('Laisser épaissir la sauce à feu doux 10 minutes.', 5, 15),
('Pendant ce temps, il faut aussi cuire les pâtes, les égoutter et les réserver.', 6, 15),
('Dans un plat à gratin, verser la moitié des pâtes, recouvrir d''une fine couche de fromage râpé, étaler par dessus la préparation au chorizo. recouvrir avec la seconde moitié des pâtes, nouvelle couche de fromage râpé et le tout au four (200°C) pendant 20 minutes le temps que le formage gratine.', 7, 15);

INSERT INTO tag(label) VALUES
('Petit déjeuner'),
('Entrées'),
('Apéro dinatoire'),
('Plats principal'),
('Plats Rapide'),
('Desserts'),
('Végétarien'),
('Salades'),
('Soupes'),
('Gâteaux'),
('Boisson'),
('Cocktails'),
('Pâtes, riz, semoule'),
('Plats au fromage');

INSERT INTO account_has_ingredient(account_id, ingredient_id) VALUES
(1, 1);

INSERT INTO recipe_has_ingredient_with_quantity(recipe_id, ingredient_id, ingredient_quantity) VALUES
(1, 1, 180000),
(1, 2, 1),
(1, 3, 20000),
(1, 4, 1),
(1, 5, 40000),
(1, 6, 1),
(1, 7, 70000),
(1, 8, 1),
(1, 9, 60),
(2, 1, 375000),
(2, 10, 3),
(2, 11, 75000),
(2, 3, 90000),
(2, 8, 6),
(2, 9, 1000),
(2, 12, 3),
(3, 13, 1),
(3, 14, 1),
(4, 15, 1),
(4, 16, 250000),
(4, 17, 150000),
(4, 18, null),
(4, 10, null),
(4, 8, 3),
(4, 19, null),
(5, 20, 400),
(5, 3, 50000),
(5, 21, 50000),
(5, 16, null),
(5, 22, null),
(5, 18, null),
(5, 10, null),
(5, 23, 300000),
(5, 24, 100000),
(5, 25, 40000),
(5, 19, null),
(6, 26, 400000),
(6, 27, 2),
(6, 28, 1),
(6, 18, null),
(6, 10, null),
(6, 29, 1),
(6, 30, 3),
(6, 31, 3),
(6, 32, 300),
(6, 33, 50000),
(6, 34, 2),
(6, 35, null),
(7, 36, 1),
(7, 26, 1),
(7, 37, 2),
(7, 28, 1),
(7, 21, 60000),
(7, 10, 1),
(7, 18, 1),
(7, 38, 250000),
(7, 31, 1),
(7, 34, 1),
(7, 8, 1),
(7, 25, 60000),
(8, 36, 2),
(8, 16, 100),
(8, 39, 1),
(8, 40, 1),
(8, 41, 1),
(8, 10, null),
(8, 18, null),
(8, 42, 1),
(8, 43, 2),
(8, 31, 3),
(8, 19, 1),
(9, 44, 2),
(9, 45, 1000000),
(9, 36, 2),
(9, 46, 3),
(9, 37, 5),
(9, 18, null),
(9, 10, null),
(9, 47, 500000),
(9, 48, 1000000),
(9, 49, 500000),
(9, 50, 1000),
(9, 51, 15),
(10, 52, 1),
(10, 37, 4),
(10, 53, 1),
(10, 18, null),
(10, 10, null),
(10, 54, 2),
(10, 55, 1),
(10, 56, 200000),
(10, 57, 4),
(10, 58, 4),
(11, 59, 4),
(11, 18, null),
(11, 60, 800000),
(11, 61, 250),
(11, 62, 1),
(11, 63, 4),
(11, 8, 4),
(12, 64, 200000),
(12, 65, 100000),
(12, 3, 50000),
(12, 1, 40000),
(12, 9, 1000),
(13, 1, 250000),
(13, 65, 30000),
(13, 2, 1),
(13, 3, 65000),
(13, 10, 1),
(13, 8, 2),
(13, 9, 300),
(14, 55, null),
(14, 66, 1),
(14, 67, 4),
(14, 63, 4),
(15, 36, 1),
(15, 45, 4),
(15, 18, null),
(15, 10, null),
(15, 68, 500000),
(15, 24, 100000),
(15, 63, 4),
(15, 34, 10),
(15, 69, null);

INSERT INTO recipe_has_tag(recipe_id, tag_id) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 4),
(5, 4),
(6, 7),
(6, 4),
(7, 7),
(7, 4),
(8, 9),
(8, 7),
(8, 4),
(9, 4),
(9, 13),
(10, 4),
(10, 8),
(11, 4),
(11, 14),
(12, 6),
(13, 6),
(14, 3),
(15, 4),
(15, 13);

COMMIT;
