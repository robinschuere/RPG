# RPG

A small RPG project made with PEWNS.

## PEWNS
So you heard of MEAN and MERN.
Now I present you the PEWNS stack.

That's right:

- Postgres
- ExpressJS
- Node
- Websockets
- SolidJs

## DEV Setup

### Setting up Docker, Postgres and DBeaver

If you already have the files below, feel free to skip this part.

Install [Docker](https://docs.docker.com/get-docker/).

Install [DBeaver](https://dbeaver.io/download/)

After the installation, download the docker image of postgres and create a database.

```
docker pull postgres
docker run --name postgresql -e POSTGRES_USER=myusername -e POSTGRES_PASSWORD=mypassword -e POSTGRES_DB=rpg_postgres -p 5432:5432 -d postgres
```

This will create a postgres with name `postgresql`
`POSTGRES_DB=rpg_postgres` is the database name
`POSTGRES_USER=myusername` is the database admin username
`POSTGRES_PASSWORD=mypassword` is the database admin password

Postgres will be available on port 5432.

Should you change these values, be sure to remember them as you will need them at a later stage.

### Setup the backend

```
cd ./backend
```

install all the packages

```
yarn
```

Duplicate the [.env.example](backend/.env.example) into a .env file

```
IMPORTANT: If you changed the postgress values, be sure to edit them inside your local .env file
```

Duplicate the [admin_user_seed.ts.example](backend/knex/seeds/admin_user_seed.ts.example) into an admin_user_seed.ts file.

```
IMPORTANT: Chance the password inside the admin_user_seed.ts to one you would like.
```

Run the Database migrations and seeds

```
yarn migrate
```

start the server

```
yarn start
OR
yarn dev
```

### Frontend matters

```
cd ./frontend
```

install all the packages

```
yarn
```

start the app

```
yarn start
OR
yarn dev
```

## <u>Mail verification setup</u>

If you want to sent mails with a verification token, there are some ways to achieve this. Here you will find a very short description how the mail setup via gmail is done.

- create a new gmail account (ie. noreply.somethingsomething@gmail.com)
- setup 2-steps authentication (through text OR authenticator)
- setup app-passwords
- create a new app password (16 chars) for RPG
- set the key MAIL_PASSWORD in the [.env](backend/.env) file to the 16 charactered code
- set the key SHOULD_VERIFY in the [.env](backend/.env) file on `true`

```
Important: The 16 char password is not the same as your registered gmail password!
```


It is now possible to create verification tokens through the app.

It should be noted that when the verification process is not available, the backend will not forge a reset link. Whenever this happens you can manually update the password in the database.

This involves 2 steps, firstly generating a new hash and secondly, pasting that value inside the database.

For creating a hash, you can run the next command:

```
yarn create:password password
```

through dbeaver, you should find your user inside the users table were you can update the password field.

## Flows

RPG holds some different flows

### Register flow

- user registers on the website and sends an API call
- the password gets encrypted
- a verificationToken is made and placed in the database
- a mail is send for mail verification (You could use this to delete certain users after a while)
- the verification mail holds an url that redirects the user to the verification page
- user verifies his email through giving his password
- user is verified

### forgot password

- user 'forgets' his password
- user goes through the forget password page and enters his email
  - if the user was not verified yet, the old verification link will be sent
  - if the user already 'forgot' his password. The old forgot verificationToken will be sent
  - a new verificationToken is forged (expires in 1 hour) and sent to the client
- user gets his email and can be redirected to a remember page
- a new password is given
- user is redefined

### Login flow
- user enters his username (email) and password
- password gets checked
- token is returned and saved in LOCALSTORAGE (all future requests will have the token inside their request)
- user sees new button characters in menu. From there it is possible to create a character and do stuff with the character.

### Game flow

- A character has a stage in which he can do some actions.
- An action is send through websocket to the backend.
- The backend translates the action through an eventHandler. 
- The backend sends a message on the socket with the new state.
- The frontend responds on the data returned and shows the data.