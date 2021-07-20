-- Deploy washathome:init to pg

BEGIN;

-- creation of the database by inserting the tables
CREATE  DOMAIN  posint  AS  int  CHECK (VALUE >  0 );

CREATE TABLE "user" (
     id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
     pseudo TEXT NOT NULL,
     firstname TEXT NOT NULL,
     lastname TEXT NOT NULL,
     phone INT NOT NULL,
     mail TEXT NOT NULL UNIQUE,
     password TEXT NOT NULL,  
     avatar TEXT
);

CREATE TABLE booking (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    status TEXT NOT NULL,
    temperature INT NOT NULL,
    price INT NOT NULL,
    user_id INT REFERENCES "user"(id)
);

CREATE TABLE machine (
   id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   capacity INT NOT NULL DEFAULT 6,
   name TEXT NOT NULL,
   description TEXT NOT NULL,
   zip_code INT NOT NULL,
   address TEXT NOT NULL,
   city TEXT NOT NULL,
   price INT NOT NULL,
   picture TEXT,
   user_id INT REFERENCES "user"(id)
);

CREATE TABLE availibility (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  open_hour TIMESTAMPTZ,
  end_hour TIMESTAMPTZ,
  booked BOOLEAN,
  machine_id INT REFERENCES machine(id)
);

CREATE TABLE option (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    price INT NOT NULL
);

CREATE TABLE include (
    booking_id INT REFERENCES booking(id),
    option_id INT REFERENCES option(id)
);

CREATE TABLE ancillary (
    option_id INT REFERENCES option(id),
    machine_id INT REFERENCES machine(id)
);

COMMIT;
