require('dotenv').config();
r = require('rethinkdb');
const uniqid = require('uniqid');
const bodyparser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();

const { DB_NAME } = process.env;

function createConnection(req, res, next) {
  r.connect({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    db: DB_NAME
  })
    .then(function(conn) {
      req._rdbConn = conn;
      next();
    })
    .error(err => {
      console.log(err);
    });
}

function closeConnection(req, res, next) {
  req._rdbConn.close();
}

function retrieveFullTableRecords(conn, table) {
  return new Promise((resolve, reject) => {
    r.table(table)
      .run(conn)
      .then(cursor => cursor.toArray())
      .then(r => resolve(r))
      .catch(e => reject(e));
  });
}

function query(conn, tableName, constraints) {
  return new Promise((resolve, reject) => {
    if (!tableName) {
      reject('no talbeName was provided');
    }

    const tableRef = r.table(tableName);

    // apply constraints to reference
    constraints.forEach(constraint => {
      tableRef.filter(r.row(constraint.row).eq(constraint.value));
    });

    tableRef.run(conn, (err, cursor) => {
      if (err) {
        reject(err);
      }

      cursor.toArray((error, records) => {
        if (error) {
          reject(error);
        }

        resolve(records);
      });
    });
  });
}

app.use(cors());
// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(createConnection);

app.get('/', (req, res) => {
  r.table('cards')
    .run(req._rdbConn)
    .then(cursor => {
      return cursor.toArray();
    })
    .then(result => {
      res.send(JSON.stringify(result));
    })
    .error(err => {
      console.log(err);
    });
});

app.get('/brands', async (req, res) => {
  try {
    const brandData = await retrieveFullTableRecords(req._rdbConn, 'brands');

    res.status(200).json({
      success: true,
      brands: brandData
    });
  } catch (e) {
    console.error(e); // < TODO: need more legit error handling

    res.status(500).json({
      success: false,
      message: 'failed to retrieve brand data'
    });
  }
});

// TODO: use: retrieveFullTableRecords
app.get('/mlb-teams', (req, res) => {
  r.table('mlbTeams').run(req._rdbConn, (err, cursor) => {
    if (err) throw err;

    cursor.toArray((err, records) => {
      if (err) throw err;

      res.send(records);
    });
  });
});

app.get('/products/brand/:brand', (req, res) => {
  r.table('products')
    .filter(r.row('brand').eq(req.params.brand))
    .run(req._rdbConn, (err, cursor) => {
      if (err) throw err;

      cursor.toArray((err, records) => {
        if (err) throw err;

        if (records.length < 1) {
          return res.status(400).json({
            success: false,
            message: `could not find products record for brand: ${brand}`
          });
        }

        if (records.length < 1) {
          return res.status(400).json({
            success: false,
            message: `check database, found more than 1 products record for brand: ${brand}`
          });
        }

        const { products } = records[0];

        res.json({ products, success: true });
      });
    });
});

// provide brand & product
// get associated years available

app.get('/supported-years/brand/:brand/product/:product', (req, res) => {
  const { brand, product } = req.params;

  r.table('productPrintYears')
    .filter(r.row('brand').eq(brand))
    .filter(r.row('product').eq(product))
    .run(req._rdbConn, (err, cursor) => {
      cursor.toArray((err, records) => {
        res.status(200).json({
          success: true,
          years: records[0].printYears
        });
      });
    });
});

app.get('/card-types/brand/:brand/print-year/:printYear', (req, res) => {
  const { brand, printYear } = req.params;

  r.table('cardTypes')
    .filter(r.row('brand').eq(brand))
    .filter(r.row('year').eq(parseInt(printYear)))
    .run(req._rdbConn, (err, cursor) => {
      if (err) throw err;

      cursor.toArray((err, records) => {
        if (err) throw err;

        if (records.length < 1) {
          return res.status(400).json({
            success: false,
            message: `could not find card type record for brand: ${brand} and year: ${printYear}`
          });
        }

        if (records.length > 1) {
          return res.status(400).json({
            success: false,
            message: `check database, found more than 1 card type record for brand: ${brand} and year: ${printYear}`
          });
        }

        const { types, seriesTypes, variations } = records[0];

        res.send({
          types,
          seriesTypes,
          variations
        });
      });
    });
});

app.get(
  '/series/brand/:brand/product/:product/printYear/:printYear',
  async (req, res) => {
    try {
      const x = await query(req._rdbConn, 'productSeries', [
        { row: 'brand', value: req.params.brand },
        { row: 'product', value: req.params.product },
        { row: 'printYear', value: req.params.printYear }
      ]);

      res.status(200).json({ success: true, series: x[0].series });
    } catch (e) {
      console.error(e);
      res.status(500).json({ success: false });
    }
  }
);

// TODO: possible better option with primary key search
// r.table('authors').get('7644aaf2-9928-4231-aa68-4e65e31bf219').
//     run(connection, function(err, result) {
//         if (err) throw err;
//         console.log(JSON.stringify(result, null, 2));
//     });
app.get('/find-by-id/:id', (req, res) => {
  const id = req.params.id;

  r.table('cards')
    .filter(r.row('id').eq(id))
    .run(req._rdbConn, function(err, cursor) {
      if (err) throw err;
      cursor.toArray(function(err, result) {
        if (err) throw err;

        if (result.length < 1) {
          return res.send({
            success: false,
            found: false,
            msg: `no match found for id: ${id}`
          });
        }

        if (result.length > 1) {
          return res.send({
            success: false,
            found: true,
            msg: `more than one record found for id: ${id}`
          });
        }

        return res.send({
          success: true,
          found: true,
          record: result[0]
        });
      });
    });
});

app.post('/new-card', (req, res) => {
  if (typeof req.body.printYear !== 'number') {
    return res.status(400).json({
      success: false,
      message: 'param: "printYear" must be a number'
    });
  }

  r.table('cards')
    .insert({
      id: uniqid(),
      created: new Date().toISOString(),
      name: req.body.name,
      team: req.body.team,
      position: req.body.position,
      series_number: parseInt(req.body.seriesNumber),
      cardType: req.body.cardType,
      product_set: {
        brand: req.body.brand,
        product: req.body.product,
        print_year: req.body.printYear,
        series: parseInt(req.body.series)
      }
      // seriesType: Base, TC, 86B, ...etc
    })
    .run(req._rdbConn, function(err, result) {
      if (err) throw err;

      if (result.inserted !== 1) {
        return res.send('ERROR: failed to generate record.');
      }

      res.send('Success.');
    });
});

app.delete('/card/:id', (req, res) => {
  const id = req.params.id.toString();

  r.table('cards')
    .filter(r.row('id').eq(id))
    .delete()
    .run(req._rdbConn, function(err, result) {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send({ success: false, msg: JSON.stringify(err) });
      }

      console.log('-result-');
      console.log(result);

      if (result.deleted !== 1) {
        return res
          .status(200)
          .send({ success: false, msg: 'failed to delete record.' });
      }

      res.status(200).send({ success: true, msg: 'record deleted.' });
    });
});

app.use(closeConnection);

app.listen(3000, () => {
  console.log('listening on port 3000');
});
