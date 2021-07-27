BEGIN;

--TRUNCATE user,booking,machine,availibility,option,include,ancillary RESTART IDENTITY;

INSERT INTO "user"(pseudo,firstname,lastname,phone,mail,password,avatar) VALUES

('Magali95','Olivier','Magali','0601020304','ilagamreivilo@gmail.com','$2y$10$Y4r64Urv6Cudit7xE5eoW.4NmxjcEKvrX.v7nzZBK3IUUM4vQB7qm','https://randomuser.me/api/portraits/women/32.jpg'),
('Magic-Gigi','Magri','Gisele','0621452145','gigi_magri@hotmail.fr','$2y$10$yMOnyOZWJC9DsywvNwkAtOfBGdGKelu0B2kd5r1myt/gqMsXucJEC','https://st.depositphotos.com/1594308/3527/i/950/depositphotos_35274703-stock-photo-aged-woman.jpg'),
('Arthur03','Pelissier','Arthur','0798877445','apelissier03@oitlook.com','$2y$10$Z48dA.GGBuJl6ljVEnSrM.iE2TyQbQrgdfj61wE5.XzWKYXpQ8OIq','https://randomuser.me/api/portraits/men/28.jpg'),
('HermioneG','Leblanc','Eva','0685236547','leblanc-eva@hotmail.fr','coupedefeu94*','https://randomuser.me/api/portraits/women/60.jpg'),
('jojo35','Vergne','Georges','0641147858','geo.vergne@yahoo.fr','Family40','https://randomuser.me/api/portraits/men/21.jpg'),
('Apoline075','Courant','Stephanie','0796301254','courant.steph75@gmail.com','Paris75013*','https://randomuser.me/api/portraits/women/14.jpg'),
('Ratatouille','Durand','Remy','0630254169','remy_durand@outlook.com','Rdurand75*','https://randomuser.me/api/portraits/men/34.jpg'),
('Super-Fredo','Robert','Frederic','0663332600','fredo.rob75@yahoo.fr','magicworld*','https://randomuser.me/api/portraits/men/31.jpg'),
('Etoile-filante','Pasquier','Karine','0745369874','karine.pasquier73@gmail.com','Camille*lou14','https://randomuser.me/api/portraits/women/3.jpg'),
('Fleur des iles','Lavaly','Elodie','0633519181','fleurdesiles97@hotmail.com','madinina97200*','https://randomuser.me/api/portraits/women/36.jpg'),
('Feufolet','Girard','Vincent','0611856009','vgirarg@gmail.com','poissonchat50$','https://randomuser.me/api/portraits/men/20.jpg'),
('Babyfoot','Albouy','Bertrand','0759813654','bertrand.albouy69@outlook.com','beber69000*','https://randomuser.me/api/portraits/men/3.jpg'),
('As du volant','Broussard','Alexandre','0699773214','broussard-alex@yahoo.fr','akinator1994*','https://randomuser.me/api/portraits/men/42.jpg'),
('Jadounette','Servan','Jade','0662206325','jadelilly2010@icloud.com','Jade1974*','https://randomuser.me/api/portraits/women/84.jpg'),
('TinySweet','Duboz','Stéphanie','0687464125','tiny.sweet75@yahoo.fr','dsts75$','https://randomuser.me/api/portraits/women/41.jpg'),
('FlowerPower','Lemaire','Océane','0706065285','oceane.lemaire16@gmail.com','Tulipe75*','https://randomuser.me/api/portraits/women/64.jpg'),
('Supersonic','Dumas','Raphael','0698120546','raphael.dumas34@gmail.com','Bezier34000*','https://randomuser.me/api/portraits/men/38.jpg'),
('TeamAurelien','Meunier','Aurelien','0611347008','au.meunier75@hotmail.fr','SuperAurel*','https://randomuser.me/api/portraits/lego/7.jpg'),
('Louloute13','Degrise','Sophie','0661196226','sdegrise@gmail.com','Etoiledusud13*','https://randomuser.me/api/portraits/women/23.jpg'),
('Nanou69','Matthieu','Nathalie','0644054532','nathalie.mat@icloud.com','NanouMat$','https://randomuser.me/api/portraits/women/14.jpg');

INSERT INTO "status" ( label) VALUES
('en attente de confirmation'),
('depot du linge'),
('en cours de lavage'),
('lavage effectué'),
('linge récupéré'),
('annulé');


INSERT INTO machine (capacity,name,description,zip_code,address,city,latitude,longitude,price,picture,user_id) VALUES

(8,'super_clean','Je possède une machine à laver whirlppol de 8 kg.Je prendrai bien soin de votre linge ','75013','18 rue ernerst rousselle','paris',48.825127,2.354642,6,'https://tse1.mm.bing.net/th?id=OIP.hsHQH80ogrojSESsZnnO1AAAAA&pid=Api&P=0&w=300&h=300',1),
(6,'la machine de Gigi','travail rapide et soigné du linge, machine neuve et derniere génération Samsung','31400','11 avenue Crampel','toulouse',43.58437,1.452135,5,'https://tse2.mm.bing.net/th?id=OIP.nKGE3vTrx5wKcqgOKxU9UwHaFj&pid=Api&P=0&w=231&h=174',2),
(7,'top propre','je travaille de chez moi donc je suis disponible pour laver votre linge','69009','31 quai Pierre Scize','lyon',45.76662,4.816867,7,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA_CqQITzbU39z8RD1X_4lEGYEBTkFEsqqjQ&usqp=CAU',3),
(9,'Leblanc-Family-machine','profitez de notre grande machine et d/un linge séché dehors.Notre maison est non fumeur et sans animaux','13007','10 rue Emile Duployé','marseille',43.27789,5.366573,7,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-VrThu3YQ40-15_NVwRnsAVFCMczm29LpFg&usqp=CAU',4),
(6,'Chez Jojo','Retraité ayant travaillé dans une blanchisserie je saurai prendre soin de votre linge','75013','148 rue de Tolbiac','paris',48.826182,2.355504,6,'https://tse4.mm.bing.net/th?id=OIP.6zmPrIWvVQqVKYcV-cwg8QHaHa&pid=Api&P=0&w=300&h=300',5),
(7,'As du linge','super dispo je vous propose mes services.Machine récente avec de nombreux programme qui saura satisfaire toutes les demandes!','69001','104 boulevard de la croix Rousse','lyon',45.773779,4.826685,6,'https://cdn.pixabay.com/photo/2016/01/28/22/07/washing-machine-1167053__340.jpg',7),
(8,' Nico&Co','lave linge lg premium avec soin du linge par intelligence artificielle','31400','25 rue Jean Racine','toulouse',43.586026,1.457672,6,'https://tse2.mm.bing.net/th?id=OIP.oWpu66uGtQSD5b4Z2175yQHaFE&pid=Api&P=0&w=254&h=175',6),
(9,'Mr Propre','exigeant sur la propreté, vous pouvez me confier votre linge en toute sécurité.','31400','71 chemin des carmes','toulouse',43.560314,1.507926,7,'https://static5.depositphotos.com/thumbs/1007162/image/407/4072209/api_thumb_450.jpg',12),
(8,'La machine de Stef','soigneuse et rapide , je repondrai rapidement','75013','78 rue de Baudricourt','paris',48.824711,2.362264,8,'https://st4.depositphotos.com/thumbs/13349494/image/25367/253676734/api_thumb_450.jpg',14),
(6,'Chez Sophie','en congés maternité je suis disponible pour chouchouter votre linge','13007','6 bd Bompard','marseille',43.278708,5.360459,7,'https://st3.depositphotos.com/thumbs/12985848/image/18407/184077202/api_thumb_450.jpg',19),
(7,'Fee du logis','maison non fumeur avec une  machine recente. Le travaille sera soigné vous ne serez pas déçu','69009','50 rue Marietton','lyon',45.775754,480842,7,'https://st.depositphotos.com/thumbs/1247468/image/2230/22308835/api_thumb_450.jpg',20);

INSERT INTO booking (temperature,time_resa,user_id,machine_id,status_id) VALUES

(30,'2021-09-05 09:00:00',8,2,1),
(40,'2021-09-08 12:00:00',4,5,3),
(60,'2021-09-05 11:00:00',1,11,2),
(20,'2021-09-05 08:00:00',3,4,4),
(30,'2021-09-06 20:00:00',6,8,5),
(30,'2021-09-06 14:00:00',7,10,6),
(40,'2021-09-06 13:00:00',7,5,1),
(60,'2021-09-05 15:00:00',1,5,3),
(30,'2021-09-06 14:00:00',4,1,2),
(40,'2021-09-05 10:00:00',1,2,4),
(60,'2021-09-07 13:00:00',3,9,5),
(20,'2021-09-06 08:00:00',2,5,6),
(20,'2021-09-06 11:00:00',6,7,3),
(20,'2021-09-08 08:30:00',5,10,1),
(20,'2021-09-05 14:30:00',1,11,4),
(40,'2021-09-06 19:30:00',6,6,5),
(60,'2021-09-08 10:30:00',2,8,6),
(20,'2021-09-08 09:30:00',2,4,3),
(30,'2021-09-05 10:30:00',3,1,3);





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

INSERT INTO  include (booking_id,option_id) VALUES
    (1,6),
    (8,1);

INSERT INTO  ancillary (option_id,machine_id) VALUES
    (1,5),
    (5,9);

COMMIT;

