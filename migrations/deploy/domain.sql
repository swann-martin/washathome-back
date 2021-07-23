-- Deploy washathome:domain to pg

BEGIN;


CREATE DOMAIN zipcode AS TEXT
CHECK(
    -- règle générale
    VALUE ~ '^(?!00|96|99)\d{5}$'
    AND
    --exception générale
    (VALUE !~ '[12]80$' OR VALUE='34280' OR VALUE='58180')
    AND
    -- on ajoute la corse
    (VALUE !~ '^20[0457-9]' OR VALUE='20000')
    -- on ajoute la bretagne
    -- on ajoute ...
);

ALTER TABLE machine
    ALTER COLUMN zip_code TYPE zipcode;


CREATE DOMAIN mobilphone AS TEXT
CHECK (

 VALUE !~'(0|\+33)[6-7][0-9]{8}'
);

ALTER TABLE "user" 
    ALTER COLUMN phone TYPE mobilphone;

COMMIT;
