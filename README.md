# Vinnie's Cards

My CRUD system for cateloging and viewing my baseball card collection. Yes, I do have friends.

## Tech

- ReThinkDB
- NodeJS/Express
- React

## Setup

### Prerequisites

- You must have RethinkDB running on the system where you want to run the project: https://rethinkdb.com/docs/install/
- Install packages

```sh
npm install
```

### Seed Data

```sh
npm run seed
```

### Remove Data

```sh
npm run drop
```

## TODOS

### Bugs

[ ] - possible issue involving duplicate create?

### Technical

[ ] - API file
[ ] - env file for FE
[ ] - async/await setup
[ ] - unit testing

### Features

[ ] - separate table for brands
[ ] - player can be multi-position
[ ] - delete route
[ ] - refresh ID route
[ ] - error handling for network down in "View Cards"
