# offbeat test

<br>

### Description

---

A RESTful API server built by Nestjs, MySQL and TypeORM

<br>

### Getting started

---

Checkout to master branch\
`git checkout master`

Pull latest update from remote repository\
`git pull`

Install dependencies\
`npm install`

Create and configure `.env` with reference in `.env.example`

Create database in MySQL server\
`CREATE DATABASE offbeat_test;`

Start the server, since synchronize is set to true, TypeORM will create the tables with the related entities\
`npm run start`

<br>

### Design

---

#### Application design

Overview:
A server for creating or getting promotion and promotion category

There are seven api endpoints in the application:

-   Promotion category

| method | endpoints                                  | function                                       |
| ------ | ------------------------------------------ | ---------------------------------------------- |
| GET    | /api/promotion-category/all                | get all promotion categories                   |
| GET    | /api/promotion-category/all/tree-node-json | get all promotion categories by tree node json |
| GET    | /api/promotion-category/:id                | get promotion category by id                   |
| POST   | /api/promotion-category                    | create a promotion category                    |

-   Promotion

| method | endpoints          | function            |
| ------ | ------------------ | ------------------- |
| GET    | /api/promotion/all | get all promotion   |
| GET    | /api/promotion/:id | get promotion by id |
| POST   | /api/promotion     | create a promotion  |

<br>

#### Database design

In database there are mainly two tables, promotion and promotion-category. Many promotion can have the same promotion category, so it is a many-to-one relationship. The table design is shown in the below diagram.

![Database ERD](db-erd.jpeg)

### Testing

---

If you are using Postman, you can import `offbeat_test.postman_collection.json` into Postman and call the API with the collection.

![Postman collection](/postman-collection.png)
^ Postman collection overview

Unit testing and end-to-end testing are implemented in this application, simply run the tests by below commands.

Run all unit tests\
`npm run test`

Run all e2e tests\
`npm run test:e2e`

<br>
