#!/bin/bash

export PGUSER=postgres
export PGPASSWORD=ohm

sqitch deploy 1.init
sqitch deploy 2.insert