-- Verify washathome:init on pg

BEGIN;

SELECT * FROM "user" WHERE false;
SELECT * FROM booking WHERE false;
SELECT * FROM machine WHERE false;
SELECT * FROM availibility WHERE false;
SELECT * FROM option WHERE false;
SELECT * FROM include WHERE false;
SELECT * FROM ancillary WHERE false;

ROLLBACK;
