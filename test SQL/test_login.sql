SELECT 
	
	json_build_object('user_id', "user".id, 'user_pseudo', "user".pseudo,'user_lastname',"user".lastname,'user_firstname', "user".firstname,'user_phone',"user".phone,'user_mail',"user".mail,'user_avatar',"user".avatar,'user_password',"user".password)"user",
	json_build_object(
		'machine_id', machine.id,
		'machine_name', machine.name,
		'machine_address',machine.address,
		'machine_zip_code',machine.zip_code,
		'machine_city',machine.city,
		'machine_latitude',machine.latitude,
		'machine_longitude',machine.longitude
	) machine,
	json_build_object(
	'dispo_id',availibility.id,
	'dispo_open_hour',availibility.open_hour,
	'dispo_end_hour',availibility.end_hour,
	'dispo_booked',availibility.booked,
	'machine_id',machine.id
		) dispo
FROM 
	"user"
FULL OUTER JOIN machine ON  "user".id = machine.user_id
FULL OUTER JOIN availibility ON machine.id = availibility.machine_id
WHERE "user".id = 3
GROUP BY ("user".id,machine.id, availibility.id);

