#!/bin/bash

export PGUSER=postgres

dropdb ofrigo
echo "BDD supprimé"
dropuser admin_ofrigo

createuser admin_ofrigo -P -s
createdb ofrigo -O admin_ofrigo
echo "BDD crée"

rm sqitch.conf
rm sqitch.plan

sqitch init ofrigo --target db:pg:ofrigo
echo "Sqitch initialisé"