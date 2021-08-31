require('dotenv').config();
r = require('rethinkdb');

const CONNECTION_DATA = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  db: process.env.DB_NAME
};

const { DB_NAME } = process.env;

function createDatabase() {
  let connection = null;

  return new Promise((resolve, reject) => {
    r.connect(CONNECTION_DATA, (err, conn) => {
      connection = conn;

      r.dbCreate(DB_NAME).run(connection, (err, result) => {
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
  const result = await createDatabase();

  console.log(result);
})();
