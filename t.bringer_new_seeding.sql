SELECT
    json_build_object('washer_id', u .id, 'washer_pseudo', u. pseudo, 'washer_phone', u. phone, 'washer_mail', u .mail) washer,
    json_build_object('bringer_id', b.id, 'bringer_pseudo', b.pseudo) bringer,
    json_build_object(
        'idResa', booking.id,
        'dispo', booking.dispo,
        'tempResa', booking.temperature,
        'washer_id', u .id ,
        'bringer_id', b.id,
        'status_id', status.id,
        'status_name', status.label,
        'options',ARRAY_AGG ("option".id || '   ' || "option".name || '   ' || "option".price)
    ) resa ,
    json_build_object(
        'machine_id', machine.id,
        'machine_name', machine.name,
        'machine_address',machine.address,
        'machine_zip_code',machine.zip_code,
        'machine_city',machine.city,
        'machine_latitude',machine.latitude,
        'machine_longitude',machine.longitude
    ) machine
FROM
    "user" b
JOIN booking ON booking.bringer_id = b.id
JOIN "user" u ON u .id = booking.washer_id
JOIN machine ON  machine.id = booking.machine_id
JOIN status ON booking.status_id = status.id
FULL OUTER JOIN "include" ON booking.id = "include".booking_id
FULL OUTER JOIN "option" ON "option".id = "include".option_id
WHERE b.id = $
GROUP BY (u.id, b.id, booking.id,machine.id,status.id,"option".id);