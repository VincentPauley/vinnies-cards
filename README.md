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
[X] - async/await setup
[ ] - env file for FE
[ ] - unit testing
[ ] - configuration sub-route for all attribute data

#### Select from LIst component

[ ] - need ids for radio to be more unique, duplicate values was causing issue in update

### Data

[X] - single player can become typed instead.
[ ] - long term model consideration: don't want to enter duplicate full records
for the same card I have many of, so instead create a table for mapping cards
that I already have to the id of a card record.

[ ] - series type needed (in data just need in from)
... which can join to brand/year/product(mlb... etc)
[ ] - available years for brand/product is one of the last pieces
[ ] - price acquired
[ ] - need approved model on the FE to show a card needing update.
[ ] - !!! - team and position data needs to be retrieved once known that it's a baseball product - product data needs a way to reference auxillary data on demand

### Features

[ ] - Refactor and spin-off product set to it's own component.
[X] - need a form component with radios that handles all of the pre-populated
options consistently seen with these models.
[ ] - get other components into SelectFromList component
[ ] - want to start having fun with the data, make a way to run a staging DB that will actually
not be dropped and rewritten.

=== Select From List Enhancements ===
[ ] - collapse on selection and allow for change if requested
[ ] - animations
[ ] - better color schemes

[ ] - brand name translated on FE
[ ] - for card add - card type should be enabled only after brand & year
[ ] - persist values for brand/year/series accross multiple cards
[ ] - gui for creating brand/year type details

[ ] - separate table for brands
[ ] - player can be multi-position
[ ] - delete route
[ ] - refresh ID route
[ ] - error handling for network down in "View Cards"
