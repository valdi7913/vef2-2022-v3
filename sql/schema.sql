CREATE TABLE public.users (
  id SERIAL PRIMARY KEY,
  name character varying(64) NOT NULL,
  username character varying(64) NOT NULL,
  password character varying(256) NOT NULL,
  admin boolean NOT NULL
);

CREATE TABLE public.events (
  id SERIAL PRIMARY KEY,
  name VARCHAR(64) NOT NULL UNIQUE,
  slug VARCHAR(64) NOT NULL UNIQUE,
  description TEXT,
  creator INTEGER NOT NULL,
  created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT creator FOREIGN KEY (creator) REFERENCES users (id)
);

CREATE TABLE public.registrations (
  id SERIAL NOT NULL,
  event INTEGER NOT NULL,
  userId INTEGER NOT NULL,
  comment TEXT,
  created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id, event, userId),
  CONSTRAINT event FOREIGN KEY (event) REFERENCES events (id),
  CONSTRAINT userId FOREIGN KEY (userId) REFERENCES users (id)
);

