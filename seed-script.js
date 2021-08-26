require('dotenv').config();
r = require('rethinkdb');

const CONNECTION_DATA = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT
};

const { cards } = require('./seed-data/cards.seed.json');
const { cardTypes } = require('./seed-data/card-types.seed.json');
const { brands } = require('./seed-data/brands.seed.json');

function createTable(tableName) {
  let connection = null;

  return new Promise((resolve, reject) => {
    r.connect(CONNECTION_DATA, (err, conn) => {
      if (err) {
        reject(err);
      }

      connection = conn;
      r.db('test')
        .tableCreate(tableName)
        .run(connection, (err, res) => {
          if (err) {
            reject(err);
          }

          connection.close();
          resolve(res);
        });
    });
  });
}

function seedTable(tableName, data) {
  let connection = null;

  return new Promise((resolve, reject) => {
    r.connect(CONNECTION_DATA, (err, conn) => {
      if (err) {
        reject(err);
      }

      connection = conn;
      r.db('test');
      r.table(tableName)
        .insert(data)
        .run(connection, (err, res) => {
          if (err) {
            reject(err);
          }

          connection.close();
          resolve(res);
        });
    });
  });
}

(async () => {
  try {
    // generate tables
    await Promise.all([
      createTable('cards'),
      createTable('cardTypes'),
      createTable('brands')
    ]);

    console.log('=Tables Created=');

    // seed tables
    await Promise.all([
      seedTable('cards', cards),
      seedTable('cardTypes', cardTypes),
      seedTable('brands', brands)
    ]);

    console.log('=Tables Seeded=');
    console.log('finished...');
  } catch (e) {
    console.error(e);
  }
})();
