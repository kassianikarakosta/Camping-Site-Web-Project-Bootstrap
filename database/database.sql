BEGIN TRANSACTION;

DROP TABLE IF EXISTS USER;
DROP TABLE IF EXISTS CLIENT;
DROP TABLE IF EXISTS ADMINISTRATOR;
DROP TABLE IF EXISTS INCLUDES;
DROP TABLE IF EXISTS PLACE;
DROP TABLE IF EXISTS BOOKS;
DROP TABLE IF EXISTS RESERVATION;



CREATE TABLE IF NOT EXISTS "USER" (
	"username" VARCHAR(30),
	"password" VARCHAR(30),
	PRIMARY KEY ("username")
);

CREATE TABLE IF NOT EXISTS "CLIENT" (
	"username" VARCHAR(30),
	"first_name" VARCHAR(30),
	"last_name" VARCHAR(30),
	"email" VARCHAR(30),
	"phone" ,
	"street_name" VARCHAR(30),
	"street_num" INTEGER,
	"post_code" INTEGER,
	"city" VARCHAR(30),
	"birth_date" DATE,
	"nationality" VARCHAR(30),
	"id_code" VARCHAR(30),
	PRIMARY KEY ("id_code"),
	FOREIGN KEY ("username") REFERENCES "USER" ("username")
            ON UPDATE CASCADE
            ON DELETE SET_NULL
);

CREATE TABLE IF NOT EXISTS "ADMINISTRATOR" (
	"username" VARCHAR(30),
	FOREIGN KEY ("username") REFERENCES "USER" ("username")
            ON UPDATE CASCADE
            ON DELETE SET_NULL
);

CREATE TABLE IF NOT EXISTS "RESERVATION" (
	"reserv_id" VARCHAR(30),
	"arrival_date" DATE,
	"depart_date" DATE,
	"num_persons" INTEGER,
	"final_price" float,
	PRIMARY KEY ("reserv_id" AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS "BOOKS" (
	"username" VARCHAR(30),
	"reserv_id" VARCHAR(30),
	FOREIGN KEY ("username") REFERENCES "USER" ("username")
            ON UPDATE CASCADE
            ON DELETE SET_NULL,
	FOREIGN KEY ("reserv_id") REFERENCES "RESERVATION" ("reserv_id")
            ON UPDATE CASCADE
            ON DELETE SET_NULL
);

CREATE TABLE IF NOT EXISTS "PLACE" (
	"price_per_day" float,
	"type" VARCHAR(30),
	"position" VARCHAR(30),
	"place_id" VARCHAR(30),
	PRIMARY KEY ("place_id")
);

CREATE TABLE IF NOT EXISTS "INCLUDES" (
	"reserv_id" VARCHAR(30),
	"place_id" VARCHAR(30),
	FOREIGN KEY ("reserv_id") REFERENCES "RESERVATION" ("reserv_id")
            ON UPDATE CASCADE
            ON DELETE SET_NULL,
	FOREIGN KEY ("place_id") REFERENCES "PLACE" ("place_id")
            ON UPDATE CASCADE
            ON DELETE SET_NULL
);

CREATE TABLE IF NOT EXISTS "MAIL" (
	"fullname" VARCHAR(50),
	"email" VARCHAR(50),
	"subject" VARCHAR(50),
	"text" VARCHAR(500),
);

COMMIT;