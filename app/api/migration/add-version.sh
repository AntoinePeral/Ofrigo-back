#!/bin/bash

sqitch add 1.init -n "create tables"
sqitch add 2.insert -n "insert data"
sqitch add 3.add_constraints -n "add constraints"
sqitch add 4.add_functions -n "add functions"