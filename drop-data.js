require('dotenv').config();
r = require('rethinkdb');

const connectionData = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT
};

let connection = null;

r.connect(connectionData, (err, conn) => {
  connection = conn;

  r.db('test')
    .tableDrop('baseball')
    .run(connection, (err, result) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log(result);
      connection.close();
    });
});
