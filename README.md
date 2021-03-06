# Core-Backend

## Description

* REST and GraphQL API that allows users and companies to centralize their user, roles and applications management into a single API that handles everything. 
* The idea behind the project is to avoid creating a business logic to log users each time a new app is created. 
* So, the development is and will continue being centered in the flexibility to customize everything you need. PR's and suggestions are welcome. 
* I'll be versioning the API as soon as I consider it's ready for put in production.

## Installation

```bash
$ npm install
```

## Running the app locally (MongoDB required)

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running the app in Docker (Docker required)
```bash
docker-compose up
```

Once the app is running, open:

* http://localhost:3000/api for Swagger docs, or
* http://localhost:3000/graphql for GQL playground

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
