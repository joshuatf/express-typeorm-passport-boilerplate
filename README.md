# Express TypeORM Passport Boilerplate

A boilerplate API using Express, TypeORM, and Passport.  This boilerplate uses JSON web tokens to create a barebones authentication system.

This repo includes basic local storage, but additional passport methods can be added.

## Getting started

Create a `.env` file with at least the following:


Name | Example | Description
--- | --- | ---
`CLIENT_URL` | `CLIENT_URL=http://yourfrontend.com` | The frontend URL for use with access control.
`JWT_SECRET` | `JWT_SECRET=secret_json_web_token_key`  | A 256 bit key used to generate and verify JSON web tokens.

1. Run `npm i`.
2. Update database settings in the `ormconfig.json` file.
3. Run `npm start`.

## Routes

Auth routes require the use of cookies so it's important to include `credentials: 'include'` in the fetch request.

Method | Path | Description
--- | --- | ---
`POST` | `/auth/register` | Accepts an email and password to register a new user.
`POST` | `/auth/login` | Accepts an email and password to authenticate a user.
`POST` | `/auth/logout` | Clears any cookies related to the JWT and logs out the user.
`GET` | `/auth/check` | Returns `200` and the user data if a cookie is set or `401` if no token has been set.