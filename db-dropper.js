require('dotenv').config();
r = require('rethinkdb');

let CONNECTION_DATA = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT
};

const args = process.argv.slice(2);

function dropDatabase(dbName) {
  let connection = null;

  return new Promise((resolve, reject) => {
    CONNECTION_DATA.db = dbName;
    r.connect(CONNECTION_DATA, (err, conn) => {
      connection = conn;

      r.dbDrop(dbName).run(connection, (err, result) => {
        if (err) {
          reject(err);
        }

        connection.close();
        resolve(result);
      });
    });
  });
}

(async () => {
  try {
    const databaseName = args[0];
    const result = await dropDatabase(databaseName);

    if (!result.dbs_dropped || !result.dbs_dropped === 1) {
      throw new Error(result);
    }

    console.log(`successfully dropped db: ${databaseName}`);
  } catch (e) {
    console.error(e);
  }
})();
