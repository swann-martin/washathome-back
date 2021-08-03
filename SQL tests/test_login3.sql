SELECT 
	
	json_build_object('id', "user".id, 'pseudo', "user".pseudo,'lastname',"user".lastname,'firstname', "user".firstname,'phone',"user".phone,'mail',"user".mail,'avatar',"user".avatar,'password',"user".password)"user",
	json_build_object(
		'id', machine.id,
		'name', machine.name,
		'address',machine.address,
		'zip_code',machine.zip_code,
		'city',machine.city,
		'latitude',machine.latitude,
		'longitude',machine.longitude
	) machine
FROM 
	"user"
FULL OUTER JOIN machine ON "user".id=machine.user_id 
WHERE "user".id= $
GROUP BY ("user".id,machine.id);
