-- Deploy washathome:view to pg

BEGIN;

--prix du booking + prix option pour un user
CREATE VIEW recap_booking_view AS

SELECT u.id,
u.firstname,
u.lastname, 

(CASE s.id
    WHEN 6 THEN 0
    ELSE
(m.price + 
    COALESCE((
        SELECT price FROM option AS o
        INNER JOIN include AS i ON i.option_id = o.id
        WHERE i.booking_id = b.id
    ),0)
)
END
) 
AS total_amount, 
m.name AS machine_name,
s.label AS state 
FROM "user" AS u
INNER JOIN booking AS b ON b.user_id = u.id
INNER JOIN status AS s ON s.id = b.status_id
INNER JOIN machine AS m ON m.id = b.machine_id;
--WHERE u.id = 2;

COMMIT;
