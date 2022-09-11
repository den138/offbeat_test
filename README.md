# offbeat test

<br>

### Description

---

A RESTful API server built by Nestjs, MySQL and TypeORM

<br>

### Getting started

---

Checkout to master branch
`git checkout master`

Pull latest update from remote repository
`git pull`

Install dependencies
`npm install`

Create and configure `.env` with reference in `.env.example`

Create database in MySQL server
`CREATE DATABASE offbeat_test;`

Start the server, since synchronize is set to true, TypeORM will create the tables with the related entities
`npm run start`

<br>

### Design

---

##### Application design

Nestjs and TypeORM work really well when they come together in building the application.

As Nestjs provides clear design for us, it provides clear folder structure and components, at first it will take some time to build the project skeleton, but Nestjs makes the application more scalable and testable with its high compatibility with other libraries such as Express and Jest.

TypeORM is another great tool to build the application, it saves a lot of effort by managing the entities for us, as we don't need to write repetitive SQL queries in code and by migrations or setting synchronize to true, it helps to create tables for us.

##### Database design

In database, we mainly have two tables, promotion and promotion-category.
![Database ERD](db-erd.jpeg)

<br>

### Testing

---

If you are using Postman, you can import `offbeat_test.postman_collection.json` into Postman and call the API with the collection.

![Postman collection](/postman-collection.png)
^ Postman collection overview

Unit testing and end-to-end testing are implemented in this application, simply run the tests by below commands.

Run all unit tests
`npm run test`

Run all e2e tests
`npm run test:e2e`

<br>

### Afterthought

---

-   TODO
