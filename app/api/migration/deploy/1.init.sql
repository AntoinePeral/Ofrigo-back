-- Deploy ofrigo:1.init to pg

BEGIN;

CREATE TYPE rank AS ENUM ('user', 'admin');
CREATE TYPE measure AS ENUM ('mg', 'ml', 'c.à.c', 'c.à.s', 'pincée', 'sachet', 'paquet', 'coeur', 'tranche', 'pot', 'boîte', 'bouquet', 'boule', 'rouleau', 'gousse', 'feuille', 'dose');

CREATE TABLE account (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    last_name TEXT NOT NULL,
    first_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role rank NOT NULL DEFAULT 'user',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE message (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label TEXT NOT NULL,
    content TEXT NOT NULL,
    email TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE category (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ingredient (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label TEXT NOT NULL,
    picture TEXT NOT NULL,
    unit measure,
    category_id INTEGER REFERENCES category("id"),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE recipe (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label TEXT NOT NULL,
    picture TEXT NOT NULL,
    rate NUMERIC,
    difficulty TEXT NOT NULL,
    time TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE step (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    content TEXT NOT NULL,
    number INTEGER NOT NULL,
    recipe_id INTEGER NOT NULL REFERENCES recipe("id") ON UPDATE CASCADE ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tag (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE account_has_ingredient (
    account_id INTEGER NOT NULL REFERENCES account("id") ON UPDATE CASCADE ON DELETE CASCADE,
    ingredient_id INTEGER NOT NULL REFERENCES ingredient("id") ON UPDATE CASCADE ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE recipe_has_ingredient_with_quantity (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    recipe_id INTEGER NOT NULL REFERENCES recipe("id") ON UPDATE CASCADE ON DELETE CASCADE,
    ingredient_id INTEGER NOT NULL REFERENCES ingredient("id") ON UPDATE CASCADE ON DELETE CASCADE,
    ingredient_quantity NUMERIC,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE recipe_has_tag (
    recipe_id INTEGER NOT NULL REFERENCES recipe("id") ON UPDATE CASCADE ON DELETE CASCADE,
    tag_id INTEGER NOT NULL REFERENCES tag("id") ON UPDATE CASCADE ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

COMMIT;
