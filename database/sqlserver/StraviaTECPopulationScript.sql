INSERT INTO COUNTRY(CountryName, Flag)
VALUES('Costa Rica', 'https://es.wikipedia.org/wiki/Costa_Rica#/media/Archivo:Flag_of_Costa_Rica.svg');

INSERT INTO COUNTRY(CountryName, Flag)
VALUES('España', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Bandera_de_Espa%C3%B1a.svg/203px-Bandera_de_Espa%C3%B1a.svg.png');

INSERT INTO COUNTRY(CountryName, Flag)
VALUES('Estados Unidos', 'https://es.wikipedia.org/wiki/Estados_Unidos#/media/Archivo:Flag_of_the_United_States.svg');

INSERT INTO COUNTRY(CountryName, Flag)
VALUES('Chile', 'https://es.wikipedia.org/wiki/Chile#/media/Archivo:Flag_of_Chile.svg');

INSERT INTO COUNTRY(CountryName, Flag)
VALUES('Corea del Sur', 'https://es.wikipedia.org/wiki/Corea_del_Sur#/media/Archivo:Flag_of_South_Korea.svg');

INSERT INTO COUNTRY(CountryName, Flag)
VALUES('Vietnam', 'https://es.wikipedia.org/wiki/Vietnam#/media/Archivo:Flag_of_Vietnam.svg');

INSERT INTO ORGANIZER(Oemail, Opassword)
VALUES('pedrog@gmail.com', '1234');

INSERT INTO ORGANIZER(Oemail, Opassword)
VALUES('admin@gmail.com', '1234');


INSERT INTO SPORT(SportName)
VALUES('Run')

INSERT INTO SPORT(SportName)
VALUES('Ride')

INSERT INTO SPORT(SportName)
VALUES('Swim')

INSERT INTO SPORT(SportName)
VALUES('Walk')

INSERT INTO SPORT(SportName)
VALUES('Hike')

INSERT INTO SPORT(SportName)
VALUES('Kayak')

INSERT INTO SPONSOR(Sname, Phone, Logo, Agent)
VALUES('Tecnologico de Costa Rica', '88884444', 'https://es.wikipedia.org/wiki/Tecnol�gico_de_Costa_Rica#/media/Archivo:Firma_TEC.svg', 'Marco Rivera Meneses')

INSERT INTO SPONSOR(Sname, Phone, Logo, Agent)
VALUES('Intel', '44448888', 'https://es.wikipedia.org/wiki/Intel#/media/Archivo:Intel_logo_2023.svg', 'Pat Gelsinger')

INSERT INTO SPONSOR(Sname, Phone, Logo, Agent)
VALUES('HP Inc', '22227777', 'https://es.wikipedia.org/wiki/HP_Inc.#/media/Archivo:HP_logo_2012.svg', '	David Packar')

INSERT INTO SPONSOR(Sname, Phone, Logo, Agent)
VALUES('Universidad de Costa Rica', '42002478', 'https://es.wikipedia.org/wiki/Universidad_de_Costa_Rica#/media/Archivo:Logo_de_la_Universidad_de_Costa_Rica.svg', 'Felipe Vargas')

INSERT INTO SPONSOR(Sname, Phone, Logo, Agent)
VALUES('Red Bull', '77779999', 'https://es.wikipedia.org/wiki/Red_Bull#/media/Archivo:Logo_of_Red_bull.svg', 'Chaleo Yoovidhya')

INSERT INTO CATEGORY (CategoryName, Descr)
VALUES ('Junior', 'Menor de 15 anyos')

INSERT INTO CATEGORY (CategoryName, Descr)
VALUES ('Sub-23', 'De 15 a 23 anyos')

INSERT INTO CATEGORY (CategoryName, Descr) 
VALUES ('Open', 'De 24 a 30 anyos')

INSERT INTO CATEGORY (CategoryName, Descr) 
VALUES ('Elite', 'Cualquiera que quiera inscribirse')

INSERT INTO CATEGORY (CategoryName, Descr) 
VALUES ('Master A', 'De 30 a 40 anyos')

INSERT INTO CATEGORY (CategoryName, Descr) 
VALUES ('Master B', 'De 41 a 50 anyos')

INSERT INTO CATEGORY (CategoryName, Descr) 
VALUES ('Master C', 'Mas de 51 anyos')


INSERT INTO SGROUP (Gname, Ouser, Logo)
VALUES ('CorreTEC', 'admin@gmail.com', 'https://www.tec.ac.cr/sites/default/files/styles/colorbox/public/media/img/gallery/v2_carrusel_82x.png'),
        ('TICOSPRO', 'admin@gmail.com','https://scontent.fsyq1-1.fna.fbcdn.net/v/t1.6435-9/156806253_265994004894107_175676435716779135_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=be3454&_nc_ohc=FPTxJjVH-zwAX_8jZJH&_nc_ht=scontent.fsyq1-1.fna&oh=00_AfANPoDGDp1wt48f5uh8ZvuazcxKjUo1QLUXTo_PdOiuDg&oe=65849B9F'),
        ('GuanacasteSport', 'admin@gmail.com', 'https://www.nacion.com/resizer/sTLMR_u1nv4HINp2Oq1jSQdq3lM=/1440x0/filters:format(jpg):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/gruponacion/JE3LSNLRNBGKXJAL4AZBQQDP4Y.jpg');