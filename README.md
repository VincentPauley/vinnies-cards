# Vinnie's Cards

My CRUD system for cateloging and viewing my baseball card collection. Yes, I do have friends.

## Tech

- ReThinkDB
- NodeJS/Express
- React

## Setup

### Prerequisites

- You must have RethinkDB running on the system where you want to run the project
- Install packages needed for scripts and server

```sh
npm install
```

- Ensure you have edited the permissions to run the build script

```sh
chmod +x ./build.sh
```

- You'll need to install the Python driver for RethinkDB to seed the database from build script: https://rethinkdb.com/docs/install-drivers/python/
- references: https://rethinkdb.com/docs/importing/
