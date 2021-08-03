CREATE TABLE availibility (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  open_hour TIMESTAMPTZ,
  end_hour TIMESTAMPTZ,
  booked BOOLEAN,
  machine_id INT REFERENCES machine(id) on delete cascade
);