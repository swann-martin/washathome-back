-- Revert washathome:domain from pg

BEGIN;



ALTER TABLE machine
    ALTER COLUMN zip_code TYPE INT
    USING zip_code::INT;

/*DROP DOMAIN zipcode;


ALTER TABLE "user" 
    ALTER COLUMN phone TYPE INT
    USING phone :: INT;

DROP DOMAIN mobilphone;*/



COMMIT;
