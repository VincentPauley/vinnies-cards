require('dotenv').config();
r = require('rethinkdb');

const connectionData = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT
};

function dropTable(tableName) {
  let connection = null;

  return new Promise((resolve, reject) => {
    r.connect(connectionData, (err, conn) => {
      connection = conn;

      r.db('test')
        .tableDrop(tableName)
        .run(connection, (err, result) => {
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
  console.log('=Dropping Tables=');
  await Promise.all([
    dropTable('cards'),
    dropTable('cardTypes'),
    dropTable('brands')
  ]);
  console.log('=All Tables Dropped=');
  console.log('finished...');
})();
