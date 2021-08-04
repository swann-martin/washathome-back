-- Deploy washathome:view to pg

BEGIN;

CREATE VIEW  bill AS

SELECT booking.id,
(CASE s.id
    WHEN 6 THEN 0
    ELSE
(m.price + 
    COALESCE((
        SELECT SUM (price) FROM option AS o
        INNER JOIN include AS i ON i.option_id = o.id
        WHERE i.booking_id = booking.id
    ),0)
)
END
) 
AS total_amount
FROM booking 
INNER JOIN "user" AS u ON u.id=booking.bringer_id
INNER JOIN status AS s ON s.id = booking.status_id
INNER JOIN machine AS m ON m.id = booking.machine_id;
--WHERE booking.id = $

COMMIT;
