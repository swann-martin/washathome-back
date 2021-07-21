BEGIN;

--TRUNCATE user,booking,machine,availibility,option,include,ancillary RESTART IDENTITY;

INSERT INTO "user"(pseudo,firstname,lastname,phone,mail,password,avatar) VALUES

('Magali95','Olivier','Magali','0601020304','ilagamreivilo@gmail.com','yoyo21*','lien_avatar'),
('Magic-Gigi','Magri','Gisele','0621452145','gigi_magri@hotmail.fr','magicgigi20*','lien_avatar'),
('Arthur03','Pelissier','Arthur','0798877445','apelissier03@oitlook.com','chevalier03','lien_avatar'),
('HermioneG','Leblanc','Eva','0685236547','leblanc-eva@hotmail.fr','coupedefeu94*','lien_avatar'),
('jojo35','Vergne','Georges','0641147858','geo.vergne@yahoo.fr','Family40','lien_avatar'),
('Apoline075','Courant','Stephanie','0796301254','courant.steph75@gmail.com','Paris75013*','lien_avatar'),
('Nicomsn31','Delpit','Nicolas','0655447788','dnicolas@hotmail.com','Toulouse*nico31','lien_avatar'),
('Ratatouille','Durand','Remy','0630254169','remy_durand@outlook.com','Rdurand75*','lien_avatar'),
('Super-Fredo','Robert','Frederic','0663332600','fredo.rob75@yahoo.fr','magicworld*','lien_avatar'),
('Etoile-filante','Pasquier','Karine','0745369874','karine.pasquier73@gmail.com','Camille*lou14','lien_avatar'),
('Fleur des iles','Lavaly','Elodie','0633519181','fleurdesiles97@hotmail.com','madinina97200*','lien_avatar'),
('Feufolet','Girard','Vincent','0611856009','vgirarg@gmail.com','poissonchat50$','lien_avatar'),
('Babyfoot','Albouy','Bertrand','0759813654','bertrand.albouy69@outlook.com','beber69000*','lien_avatar'),
('As du volant','Broussard','Alexandre','0699773214','broussard-alex@yahoo.fr','akinator1994*','lien_avatar'),
('Jadounette','Servan','Jade','0662206325','jadelilly2010@icloud.com','Jade1974*','lien_avatar');


INSERT INTO booking (status,temperature,price,user_id) VALUES

('en attente de confirmation',30,6,2),
('en cours de lavage',40,5,4),
('depot du linge',60,5,1),
('lavage effectué',20,7,3),
('linge recupéré',30,6,6),
('annulé',30,6,7),
('en attente de confimation',40,7,5),
('en cours de lavage',60,8,1),
('depot du linge',30,7,4),
('lavage effectué',40,5,1),
('linge recupéré',60,7,3),
('annulé',20,8,2),
('en cours de lavage',20,6,6),
('depot du linge',40,4,5),
('lavage effectué',20,6,1),
('linge récupéré',40,5,5),
('annulé',60,6,2),
('en cours de lavage',20,5,2),
('en cours de lavage',30,6,3);



INSERT INTO machine (capacity,name,description,zip_code,address,city,price,picture,user_id) VALUES

(8,'super_clean','Je possède une machine à laver whirlppol de 8 kg.Je prendrai bien soin de votre linge ','75013','18 rue ernerst roussel','paris',6,'lien_picture',1),
(6,'la machine de Gigi','travail rapide et soigné du linge, machine neuve et derniere génération Samsung','31400','11 avenue Crampel','toulouse',5,'lien_picture',2),
(7,'top propre','je travaille de chez moi donc je suis disponible pour laver votre linge','69009','31 quai Pierre Scize','lyon',7,'lien_picture',3),
(9,'Leblanc-Family-machine','profitez de notre grande machine et d/un linge séché dehors.Notre maison est non fumeur et sans animaux','13007','10 rue Emile Duployé','Marseille',7,'lien_picture',4),
(6,'Chez Jojo','Retraité ayant travaillé dans une blanchisserie je saurai prendre soin de votre linge','75013','148 rue de Tolbiac','paris',6,'lien_picture',5),
(7,'As du linge','super dispo je vous propose mes services.Machine récente avec de nombreux programme qui saura satisfaire toutes les demandes!','69001','104 boulevard de la croix Rousse','lyon',6,'lien_picture',7),
(8,' Nico&Co','lave linge lg premium avec soin du linge par intelligence artificielle','31400','25 rue Jean Racine','toulouse',6,'lien_picture',6);




INSERT INTO availibility(open_hour,end_hour,booked,machine_id) VALUES

('2021-09-05 08:00:00','2021-09-05 12:00:00','false',2),
('2021-09-06 08:00:00','2021-09-06 12:00:00','false',2),
('2021-09-08 08:00:00','2021-09-08 12:00:00','false',2),
('2021-09-09 08:00:00','2021-09-09 12:00:00','false',2),
('2021-09-07 08:00:00','2021-09-07 12:00:00','false',3),
('2021-09-05 08:00:00','2021-09-05 12:00:00','false',3),
('2021-09-05 14:00:00','2021-09-05 18:00:00','true',4),
('2021-09-08 09:00:00','2021-09-08 13:00:00','false',4),
('2021-09-06 12:00:00','2021-09-06 15:00:00','true',4),
('2021-09-06 08:00:00','2021-09-06 20:00:00','false',6),
('2021-09-05 08:00:00','2021-09-05 12:00:00','false',1),
('2021-09-05 08:00:00','2021-09-05 12:00:00','false',2),
('2021-09-05 14:00:00','2021-09-05 18:00:00','false',1),
('2021-09-07 08:00:00','2021-09-07 12:00:00','false',7),
('2021-09-06 12:00:00','2021-09-06 15:00:00','false',7),
('2021-09-06 16:00:00','2021-09-06 17:00:00','true',4);



INSERT INTO option (name,price) VALUES

('séchage',3),
('lessive spéciale  linge blanc ou laine ou couleur ',2),
('séchage du linge au grand air',4),
('lingette anti décoloration',1),
('repassage avec centrale vapeur professionnelle',5),
('capsule de lessive',2),
('séchage possible de votre linge',3);

COMMIT;

