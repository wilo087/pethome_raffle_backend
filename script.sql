CREATE DATABASE pethome_raffle;


CREATE TABLE users (
 id SERIAL PRIMARY KEY NOT NULL, 
 nombre VARCHAR(100) NOT NULL,
 cedula INTEGER NOT NULL UNIQUE,
 codigo INTEGER NOT NULL UNIQUE,
 winner INTEGER NOT NULL DEFAULT 0,
 created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


create table auth (
 id SERIAL PRIMARY KEY NOT NULL, 
 username VARCHAR(100) NOT NULL UNIQUE,
 password VARCHAR(100) NOT NULL
);