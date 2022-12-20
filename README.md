## Description

This project is for Backend Dev position at 10 Minute School.
The app handle a Event Management service.

## Database Setup

Make sure that your computer has postgre database installed & pgAdmin(software).
By pgAdmin login to your account and create a database.

## Environment Setup

After successfull cloning create a '.env' file in root ditectory.
Copy from the 'sample.env' & paste to '.env' file.

Write the port number you want to run this app.

```bash
PORT=
```

Write your username , password & db_name you creted by apAdmin then save the '.env' file.

```bash
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5432
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
RUN_MIGRATIONS=true
```

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

# production mode
$ npm run start:prod
```
