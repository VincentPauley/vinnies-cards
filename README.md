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

### Data

[X] - card type table

    ... individual card record will receive the abbreviation which can be
      then expanded upon through a DB lookup to match human-readable version

[ ] - series type needed
[ ] - single player can become typed instead.
[ ] - need approved model on the FE to show a card needing update.

### Features

[ ] - for card add - card type should be enabled only after brand & year
[ ] - gui for creating brand/year type details

[ ] - separate table for brands
[ ] - player can be multi-position
[ ] - delete route
[ ] - refresh ID route
[ ] - error handling for network down in "View Cards"
