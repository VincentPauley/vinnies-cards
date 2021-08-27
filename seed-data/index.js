const tableDir = './tables';
const ext = '.seed.json';

const brands = require(`${tableDir}/brands${ext}`);
const products = require(`${tableDir}/products${ext}`);
const cardTypes = require(`${tableDir}/card-types${ext}`);
const cards = require(`${tableDir}/cards${ext}`);
const mlbTeams = require(`${tableDir}/mlb-teams${ext}`);

module.exports = [brands, products, cardTypes, cards, mlbTeams];
