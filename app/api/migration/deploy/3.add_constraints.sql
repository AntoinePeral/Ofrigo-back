-- Deploy ofrigo:3.add_constraints to pg

BEGIN;

CREATE DOMAIN email_validator as TEXT CHECK ( VALUE ~ '^[\w\-_]+(\.[\w\-_]+)?@[a-zA-Z0-9\-]+(\.[a-zA-Z0-9\-]+)?\.[a-z]{2,}$')

ALTER TABLE account
  ALTER COLUMN email TYPE email_validator;

COMMIT;
