-- Revert washathome:view from pg

BEGIN;
drop view bill;

COMMIT;
