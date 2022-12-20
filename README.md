## Description

This project is for Backend Dev position at 10 Minute School.
The app handle a Event Management service.

## Database Setup

Make sure that your computer has postgre database installed & pgAdmin(software).
By pgAdmin login to your account and create a database.

## Environment Setup

After successfull cloning open the repository in a code editor.
Create a `.env` file in root ditectory.
Copy from the 'sample.env' & paste to `.env` file.

Write the port number you want to run this app.

```bash
PORT=
```

Write your username , password & db_name you creted by apAdmin then save the `.env` file.

```bash
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5432
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
RUN_MIGRATIONS=true
```

## Insert Data

There is a `db-scipts.sql` file.
The insert statements are written there .
Insert demo data by running the scripts.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## API Documentation

```bash
# To see API documentaion click here if you don't change the port number
http://localhost:4055/docs#/

All API Endpoints, Req Body, Query Param, and Response format have shown in the Swagger UI.
```
