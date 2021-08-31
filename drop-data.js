require('dotenv').config();
r = require('rethinkdb');

const connectionData = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  db: process.env.DB_NAME
};

function listTables() {
  let connection = null;

  return new Promise((resolve, reject) => {
    r.connect(connectionData, (err, conn) => {
      connection = conn;

      r.tableList().run(connection, (err, result) => {
        resolve(result);
        connection.close();
      });
    });
  });
}

function dropTable(tableName) {
  let connection = null;

  return new Promise((resolve, reject) => {
    r.connect(connectionData, (err, conn) => {
      connection = conn;

      r.tableDrop(tableName).run(connection, (err, result) => {
        if (err) {
          reject(err);
        }

        connection.close();
        resolve(result);
      });
    });
  });
}
// TODO: just make this a straight-up table drop
(async () => {
  console.log('=Dropping Tables=');

  const tableNames = await listTables();

  console.log('tables');
  console.log(tableNames);

  await Promise.all(tableNames.map(t => dropTable(t)));
  // TODO: make this list dynamic
  // await Promise.all([
  //   dropTable('cards'),
  //   dropTable('products'),
  //   dropTable('cardTypes'),
  //   dropTable('brands'),
  //   dropTable('mlbTeams'),
  //   dropTable('productPrintYears'),
  //   dropTable('productSeries')
  // ]);
  // console.log('=All Tables Dropped=');
  console.log('finished...');
})();
