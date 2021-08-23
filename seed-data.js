require('dotenv').config();
r = require('rethinkdb');
const fs = require('fs');

const connectionData = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT
};

let connection = null;

r.connect(connectionData, (err, conn) => {
  connection = conn;

  fs.readFile('seed.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    r.db('test')
      .tableCreate('baseball')
      .run(connection, (err, res) => {
        if (err) {
          console.error(err);
          return;
        }

        r.table('baseball')
          .insert(JSON.parse(data))
          .run(connection, (err, res) => {
            if (err) {
              console.log(err);
              return;
            }

            console.log(res);

            connection.close();
          });
      });
  });

  // r.db('test')
  //   .tableDrop('baseball')
  //   .run(connection, (err, result) => {
  //     if (err) {
  //       console.error(err);
  //       return;
  //     }

  //     console.log(result);
  //     connection.close();
  //   });
});
