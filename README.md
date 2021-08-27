# Vinnie's Cards

My CRUD system for cateloging and viewing my baseball card collection. Yes, I do have friends.

## Tech

- ReThinkDB
- NodeJS/Express
- React

## Setup

### Prerequisites

- You must have RethinkDB running on the system where you want to run the project: https://rethinkdb.com/docs/install/

### Install Project Dependencies

```sh
npm install
```

### UI Install

TODO...

### Seed Data

Assuming you have rethink db installed on your machine, run the below command from the root of this directory and all tables will be generated and seeded with initial data.

```sh
npm run seed
```

### Remove Data

The below command will drop all tables and their included data. WARNING: this is an irreversible aciton that will remove ALL data, not just data from the seed files.

```sh
npm run drop
```

## TODOS

### Bugs

[X] - possible issue involving duplicate create?

### Technical

[X] - API file
[ ] - env file for FE
[ ] - async/await setup
[ ] - unit testing
[ ] - configuration sub-route for all attribute data

### Data

[X] - card type table
[X] - single player can become typed instead.

[ ] - series type needed
... which can join to brand/year/product(mlb... etc)
[ ] - price acquired
[ ] - need approved model on the FE to show a card needing update.

### Features

[ ] - brand name translated on FE
[ ] - for card add - card type should be enabled only after brand & year
[ ] - persist values for brand/year/series accross multiple cards
[ ] - gui for creating brand/year type details

[ ] - separate table for brands
[ ] - player can be multi-position
[ ] - delete route
[ ] - refresh ID route
[ ] - error handling for network down in "View Cards"
