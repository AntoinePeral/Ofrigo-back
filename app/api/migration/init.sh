#!/bin/bash

export PGUSER=postgres

dropdb ofrigo
echo "BDD O'Frigo supprimé"
dropuser admin_ofrigo
echo "USER admin_ofrigo supprimé"

createuser admin_ofrigo -P -s
echo "USER admin_ofrigo crée"
createdb ofrigo -O admin_ofrigo
echo "BDD O'Frigo crée"

rm sqitch.conf
rm sqitch.plan

sqitch init ofrigo --target db:pg:ofrigo
echo "SQITCH initialisé"

echo "Ajout des versions"
sqitch add 1.init -n "create tables"
sqitch add 2.insert -n "insert data"

echo "Création des tables"
sqitch deploy 1.init
echo "Insertion des données"
sqitch deploy 2.insert