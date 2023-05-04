export PGUSER=postgres
export PGPASSWORD=ohm

# sqitch verify 3.add_constraints
sqitch verify 1.init
sqitch verify 2.insert
sqitch verify 3.add_constraints
sqitch verify 4.add_functions