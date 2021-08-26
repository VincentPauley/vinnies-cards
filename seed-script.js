require('dotenv').config();
r = require('rethinkdb');
const seeds = require('./seed-data/index.js');

const CONNECTION_DATA = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT
};

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
    tableNames = seeds.slice().map(seed => seed.tableName);

    console.log('creating tables...');

    await Promise.all(tableNames.map(t => createTable(t)));

    console.log(`${tableNames.length} tables created`);
    console.log('seeding tables...');

    await Promise.all(seeds.map(s => seedTable(s.tableName, s.records)));

    console.log('tables seeded');
  } catch (e) {
    console.error(e);
  }
})();
