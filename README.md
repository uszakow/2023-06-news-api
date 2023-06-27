## Description

API for a simple news applikation, where every logged in user can publish news

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

# Instances

## User

### Create a user

`POST http://localhost:3052/user`
Example:
```
{
  "name": "Jan",
  "password": "qwer"
}
```
The request has fields `name` and `password`. Both fields are required.
Each user should have a unique name. Password should have at least 4 signs.

### Login a user

`POST http://localhost:3051/user/login`
Example:
```
{
  "name": "Jan",
  "password": "qwer"
}
```
The request has fields `name` and `password`. Both fields are required.
The response contain a token.

### Get the current user

`GET http://localhost:3051/user`
The header should have a token:
`Authorization: "Bearer token"`

### Update the current user

`PUT http://localhost:3051/user`
Example:
```
{
  "password": "qwer1"
}
```
The header should have a token.
The request has fields `name` and `password`. Both fields are optional.

### Delete the current user

`DELETE http://localhost:3051/user`
The header should have a token.

## News

### Create news

`POST http://localhost:3052/news`
Example:
```
{
    "title": "News title",
    "content": "News content"
}
```
The header should have a token.
The request has fields `title` and `content`. Both fields are required.

### Get all news

`GET http://localhost:3052/news`

### Get news by id

`GET http://localhost:3052/news/:newsId`

### Update news

`PUT http://localhost:3052/news/:newsId`
Example:
```
{
    "title": "Updated title"
}
```
The header should have a token.
The request has fields `title` and `content`. Both fields are optional.

### Delete news

`DELETE http://localhost:3052/news/:newsId`
The header should have a token.
