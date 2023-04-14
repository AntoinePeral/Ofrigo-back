#!/bin/bash

export PGUSER=postgres
export PGPASSWORD=ohm

# sqitch revert 1.init.sql
# sqitch revert 3.add_constraints
sqitch revert