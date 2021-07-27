-- Revert washathome:init from pg

BEGIN;

-- delation of tables
DROP TABLE include;
DROP TABLE ancillary;
DROP TABLE availibility;
DROP TABLE option;
DROP TABLE booking;
DROP TABLE "status";
DROP TABLE machine;
DROP TABLE "user";
DROP DOMAIN posint ;

COMMIT;
