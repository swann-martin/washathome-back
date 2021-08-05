-- Deploy washathome:init to pg

BEGIN;

-- creation of the database by inserting the tables
CREATE  DOMAIN  posint  AS  int  CHECK (VALUE >  0 );

CREATE TABLE "user" (
     id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
     pseudo TEXT NOT NULL,
     lastname TEXT NOT NULL,
     firstname TEXT NOT NULL,
     phone VARCHAR NOT NULL,
     mail TEXT NOT NULL UNIQUE,
     password TEXT NOT NULL,  
     avatar TEXT
);

CREATE TABLE "status" (
 id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 label TEXT NOT NULL UNIQUE
);

CREATE TABLE machine (
   id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   capacity INT NOT NULL DEFAULT 6,
   name TEXT NOT NULL,
   description TEXT NOT NULL,
   zip_code INT NOT NULL,
   address TEXT NOT NULL,
   city TEXT NOT NULL,
   latitude FLOAT ,
   longitude FLOAT,
   price INT NOT NULL,
   picture TEXT,
   user_id INT REFERENCES "user"(id) ON DELETE CASCADE
);

CREATE TABLE booking (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    temperature INT NOT NULL,
    --time_resa TIMESTAMPTZ ,
    dispo TEXT NOT NULL,
    bringer_id INT REFERENCES "user"(id) ON DELETE CASCADE,
    washer_id INT REFERENCES "user"(id) ON DELETE CASCADE,
    machine_id INT REFERENCES machine(id) ON DELETE CASCADE,
    status_id INT REFERENCES "status"(id) ON DELETE CASCADE
);



/*CREATE TABLE availibility (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  open_hour TIMESTAMPTZ,
  end_hour TIMESTAMPTZ,
  booked BOOLEAN,
  machine_id INT REFERENCES machine(id)
);*/

CREATE TABLE option (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    price INT NOT NULL
);

CREATE TABLE include (
    booking_id INT REFERENCES booking(id) ON DELETE CASCADE,
    option_id INT REFERENCES option(id) ON DELETE CASCADE
);

CREATE TABLE ancillary (
    option_id INT REFERENCES option(id) ON DELETE CASCADE,
    machine_id INT REFERENCES machine(id) ON DELETE CASCADE 
);

COMMIT;
