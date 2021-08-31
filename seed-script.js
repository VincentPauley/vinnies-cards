require('dotenv').config();
r = require('rethinkdb');
const seeds = require('./seed-data/index.js');

const CONNECTION_DATA = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  db: process.env.DB_NAME
};

const { DB_NAME } = process.env;

function createTable(tableName) {
  console.log(`creating table: ${DB_NAME}.${tableName}`);
  let connection = null;

  return new Promise((resolve, reject) => {
    r.connect(CONNECTION_DATA, (err, conn) => {
      if (err) {
        reject(err);
      }

      connection = conn;
      r.db(DB_NAME) // TODO: might not need the db call here given the connection, test that out
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

    await Promise.all(
      seeds.map(s => {
        seedTable(s.tableName, s.records);
      })
    );

    console.log('tables seeded');
  } catch (e) {
    console.error(e);
  }
})();
