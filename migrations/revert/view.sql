-- Revert washathome:view from pg

BEGIN;

drop view recap_booking_view;

COMMIT;
