-- Deploy ofrigo:1.init to pg

BEGIN;

CREATE TYPE rank AS ENUM ('user', 'admin');
CREATE TYPE measure AS ENUM ('mg', 'ml', 'c.à.c', 'c.à.s', 'pincée', 'sachets', 'paquet', 'coeur', 'tranches', 'pot', 'boîtes', 'bouquet', 'boule', 'rouleau', 'gousses', 'feuille');

CREATE TABLE account (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    last_name TEXT NOT NULL,
    first_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role rank NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

CREATE TABLE message (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    email TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

CREATE TABLE category (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

CREATE TABLE ingredient (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label TEXT NOT NULL,
    unit measure,
    category_id INTEGER NOT NULL REFERENCES category("id"),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

CREATE TABLE recipe (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label TEXT NOT NULL,
    picture TEXT  NOT NULL,
    rate NUMERIC,
    difficulty TEXT NOT NULL,
    time TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

CREATE TABLE step (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    content TEXT NOT NULL,
    number INTEGER NOT NULL,
    recipe_id INTEGER NOT NULL REFERENCES recipe("id"),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

CREATE TABLE tag (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

CREATE TABLE account_has_ingredient (
    account_id INTEGER NOT NULL REFERENCES account("id"),
    ingredient_id INTEGER NOT NULL REFERENCES ingredient("id"),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

CREATE TABLE recipe_has_ingredient_with_quantity (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    recipe_id INTEGER NOT NULL REFERENCES recipe("id"),
    ingredient_id INTEGER NOT NULL REFERENCES ingredient("id"),
    ingredient_quantity NUMERIC,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

CREATE TABLE recipe_has_tag (
    recipe_id INTEGER NOT NULL REFERENCES recipe("id"),
    tag_id INTEGER NOT NULL REFERENCES tag("id"),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

COMMIT;
