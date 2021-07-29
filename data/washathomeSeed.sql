BEGIN;

--TRUNCATE user,booking,machine,availibility,option,include,ancillary RESTART IDENTITY;

INSERT INTO "user"(pseudo,lastname,firstname,phone,mail,password,avatar) VALUES

('Magali95','Olivier','Magali','0601020304','ilagamreivilo@gmail.com','$2y$12$1J1F0duekS2wxVBpuQ8DqOMx1gTfNsnsOEOoIkonE4DDbho8Y6ifO ','https://randomuser.me/api/portraits/women/32.jpg'),
('Magic-Gigi','Magri','Gisele','0621452145','gigi_magri@hotmail.fr','$2y$10$yMOnyOZWJC9DsywvNwkAtOfBGdGKelu0B2kd5r1myt/gqMsXucJEC','https://st.depositphotos.com/1594308/3527/i/950/depositphotos_35274703-stock-photo-aged-woman.jpg'),
('Arthur03','Pelissier','Arthur','0798877445','apelissier03@oitlook.com','$2y$10$Z48dA.GGBuJl6ljVEnSrM.iE2TyQbQrgdfj61wE5.XzWKYXpQ8OIq','https://randomuser.me/api/portraits/men/28.jpg'),
('HermioneG','Leblanc','Eva','0685236547','leblanc-eva@hotmail.fr','$2y$10$0I4I11OyL6HPnfxUfEJBOuWhNvZRI50eeA5fqYTKlvPiEoauMTSDC','https://randomuser.me/api/portraits/women/60.jpg'),
('jojo35','Vergne','Georges','0641147858','geo.vergne@yahoo.fr','$2y$10$5rNfeIk0vfE6xldA/8PHaen4j6bJF9rOEt8W1xiOQhGJpd6uc20my','https://randomuser.me/api/portraits/men/21.jpg'),
('Apoline075','Courant','Stephanie','0796301254','courant.steph75@gmail.com','$2y$10$mhkCR3HoaMyeVKhUIycyXeUrQozVGc6s6YhyGK4ngbHtfUt9SLsuS','https://randomuser.me/api/portraits/women/14.jpg'),
('Ratatouille','Durand','Remy','0630254169','remy_durand@outlook.com','$2y$10$4UNcw9.Z9Qa7adKlccnSme0NJr2chZTMdeZs9wfOBd.kKVVdGvUdq','https://randomuser.me/api/portraits/men/34.jpg'),
('Super-Fredo','Robert','Frederic','0663332600','fredo.rob75@yahoo.fr','$2y$10$sLuFOVo/TkAomuPt1cNR5e/qShXplz5NSGLBeuAr2YV00OWqQMeIa','https://randomuser.me/api/portraits/men/31.jpg'),
('Etoile-filante','Pasquier','Karine','0745369874','karine.pasquier73@gmail.com','$2y$10$SKltrILLQiTD6FUkHFhSLehqPkfFKIM8YpSZQCKwPumniDeO0iM6G','https://randomuser.me/api/portraits/women/3.jpg'),
('Fleur des iles','Lavaly','Elodie','0633519181','fleurdesiles97@hotmail.com','$2y$10$1treBnvvCfhR0HZ95M5CgudIkUkT6BL8V9mEnAvU5WhwNycdhMtYW','https://randomuser.me/api/portraits/women/36.jpg'),
('Feufolet','Girard','Vincent','0611856009','vgirarg@gmail.com','$2y$10$VtP9yZIUcadaxE3niMWnc.BdSABLHGxVEQdv0P.sC1vLFtiu9r8eC','https://randomuser.me/api/portraits/men/20.jpg'),
('Babyfoot','Albouy','Bertrand','0759813654','bertrand.albouy69@outlook.com','$2y$10$PvRvgSgO1QdMNEiAvbI3Defc44.cVdTlYzRUcc10QxBLFagAf2D2y','https://randomuser.me/api/portraits/men/3.jpg'),
('As du volant','Broussard','Alexandre','0699773214','broussard-alex@yahoo.fr','$2y$10$zFmUQT/trhqJNiRCsUqK9eLEeHee5/hWRgjexvGNlgAHqlhVeEeK6','https://randomuser.me/api/portraits/men/42.jpg'),
('Jadounette','Servan','Jade','0662206325','jadelilly2010@icloud.com','$2y$10$veibov4rX2DCE.rgRqoESO.U1FwH84BjSvHegDlLshM1TS9jlEEHS','https://randomuser.me/api/portraits/women/84.jpg'),
('TinySweet','Duboz','Stéphanie','0687464125','tiny.sweet75@yahoo.fr','$2y$10$8SAHOMP1nrARmauQy25gteiN6Iu.80H4rdsxbglwS34Wms0aAH7va','https://randomuser.me/api/portraits/women/41.jpg'),
('FlowerPower','Lemaire','Océane','0706065285','oceane.lemaire16@gmail.com','$2y$10$nQ5vGTJsip7ScUUywzjlDudxBs1z0hDc2GdLWyY9zEzCk2vTAXU7G','https://randomuser.me/api/portraits/women/64.jpg'),
('Supersonic','Dumas','Raphael','0698120546','raphael.dumas34@gmail.com','$2y$10$9kGFjf7zu8Zbg939.5e9dOrGF6nD1cYSNRnXCURlLuZFWoFa1URAW','https://randomuser.me/api/portraits/men/38.jpg'),
('TeamAurelien','Meunier','Aurelien','0611347008','au.meunier75@hotmail.fr','$2y$10$6ltOt8nn3m4JfdGREhvGAev4HZ3h.qEkYYg8HCK.hFlqXrX1rUclG','https://randomuser.me/api/portraits/lego/7.jpg'),
('Louloute13','Degrise','Sophie','0661196226','sdegrise@gmail.com','$2y$10$Q0SVwFJRD48aVD1b70SvQeTtTm2JfN1KSWVnE/7xP2vTLZmyrnlQu','https://randomuser.me/api/portraits/women/23.jpg'),
('Nanou69','Matthieu','Nathalie','0644054532','nathalie.mat@icloud.com','$2y$10$gwQVimNiPqDYv5QzOw4vEOcNf8REj4Vvx2jntItIWmxaCxYZIcCWq','https://randomuser.me/api/portraits/women/14.jpg');

INSERT INTO "status" ( label) VALUES
('en attente de confirmation'),
('depot du linge'),
('en cours de lavage'),
('lavage effectué'),
('linge récupéré'),
('annulé');


INSERT INTO machine (capacity,name,description,zip_code,address,city,latitude,longitude,price,picture,user_id) VALUES
(8,'super_clean','Je possède une machine à laver whirlppol de 8 kg.Je prendrai bien soin de votre linge ','75013','18 rue ernerst rousselle','paris',48.825127,2.354642,5,'https://tse1.mm.bing.net/th?id=OIP.hsHQH80ogrojSESsZnnO1AAAAA&pid=Api&P=0&w=300&h=300',1),
(6,'la machine de Gigi','travail rapide et soigné du linge, machine neuve et derniere génération Samsung','31400','11 avenue Crampel','toulouse',43.58437,1.452135,6,'https://tse2.mm.bing.net/th?id=OIP.nKGE3vTrx5wKcqgOKxU9UwHaFj&pid=Api&P=0&w=231&h=174',2),
(7,'top propre','je travaille de chez moi donc je suis disponible pour laver votre linge','69009','31 quai Pierre Scize','lyon',45.76662,4.816867,7,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA_CqQITzbU39z8RD1X_4lEGYEBTkFEsqqjQ&usqp=CAU',10),
(9,'Leblanc-Family-machine','profitez de notre grande machine et d/un linge séché dehors.Notre maison est non fumeur et sans animaux','13007','10 rue Emile Duployé','marseille',43.27789,5.366573,4,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-VrThu3YQ40-15_NVwRnsAVFCMczm29LpFg&usqp=CAU',4),
(6,'Chez Jojo','Retraité ayant travaillé dans une blanchisserie je saurai prendre soin de votre linge','75013','148 rue de Tolbiac','paris',48.826182,2.355504,5,'https://tse4.mm.bing.net/th?id=OIP.6zmPrIWvVQqVKYcV-cwg8QHaHa&pid=Api&P=0&w=300&h=300',5),
(7,'As du linge','super dispo je vous propose mes services.Machine récente avec de nombreux programme qui saura satisfaire toutes les demandes!','69001','104 boulevard de la croix Rousse','lyon',45.773779,4.826685,6,'https://cdn.pixabay.com/photo/2016/01/28/22/07/washing-machine-1167053__340.jpg',13),
(8,' Nico&Co','lave linge lg premium avec soin du linge par intelligence artificielle','31400','25 rue Jean Racine','toulouse',43.586026,1.457672,5,'https://tse2.mm.bing.net/th?id=OIP.oWpu66uGtQSD5b4Z2175yQHaFE&pid=Api&P=0&w=254&h=175',16),
(9,'Mr Propre','exigeant sur la propreté, vous pouvez me confier votre linge en toute sécurité.','31400','71 chemin des carmes','toulouse',43.560314,1.507926,8,'https://static5.depositphotos.com/thumbs/1007162/image/407/4072209/api_thumb_450.jpg',12),
(8,'La machine de Stef','soigneuse et rapide , je repondrai rapidement','75013','78 rue de Baudricourt','paris',48.824711,2.362264,6,'https://st4.depositphotos.com/thumbs/13349494/image/25367/253676734/api_thumb_450.jpg',15),
(6,'Chez Sophie','en congés maternité je suis disponible pour chouchouter votre linge','13007','6 bd Bompard','marseille',43.278708,5.360459,7,'https://st3.depositphotos.com/thumbs/12985848/image/18407/184077202/api_thumb_450.jpg',19),
(7,'Fee du logis','maison non fumeur avec une  machine recente. Le travaille sera soigné vous ne serez pas déçu','69009','50 rue Marietton','lyon',45.775754,480842,7,'https://st.depositphotos.com/thumbs/1247468/image/2230/22308835/api_thumb_450.jpg',20);

INSERT INTO booking (temperature,time_resa,bringer_id,washer_id,machine_id,status_id) VALUES

(30,'2021-09-05 09:00:00',8,19,10,1),
(40,'2021-09-08 12:00:00',4,5,5,3),
(60,'2021-09-05 11:00:00',14,20,11,2),
(20,'2021-09-05 08:00:00',3,4,4,4),
(30,'2021-09-06 20:00:00',6,12,8,5),
(30,'2021-09-06 14:00:00',7,19,10,6),
(40,'2021-09-10 13:00:00',7,5,5,1),
(60,'2021-09-05 15:00:00',11,13,6,3),
(30,'2021-09-06 14:00:00',4,1,1,2),
(40,'2021-09-05 10:00:00',17,2,2,4),
(60,'2021-09-07 13:00:00',3,15,9,5),
(20,'2021-09-06 08:00:00',8,10,3,6),
(20,'2021-09-06 11:00:00',6,16,7,3),
(20,'2021-09-08 08:30:00',18,19,10,1),
(20,'2021-09-05 14:30:00',9,20,11,4);






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

('lessive spéciale',3),
('lingette anti decoloration',2),
('séchage au sèche linge avec pliage',5),
('pliage du linge',2),
('repassage',8),
('séchage au sèche linge',3),
('séparation des couleurs',5);


INSERT INTO  include (booking_id,option_id) VALUES
    (1,6),
    (8,1);

INSERT INTO  ancillary (option_id,machine_id) VALUES
    (1,5),
    (5,9);

COMMIT;

