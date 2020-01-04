const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  user: process.env.USER,
  host: process.env.HOST,
  db: process.env.DB,
  port: process.env.PORT,
  qt: process.env.QT,
  at: process.env.AT,
  apt: process.env.APT,
  newRelic: process.env.NR
};