require('dotenv').config();

const debug = require('debug')('app');
const path = require('path');
const routerApi = require('./routers');
const express = require('express')

const app = express()

app.use((req, _, next) => {
  debug(req.url);
  next();
});

// cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  // response to preflight request
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.static(path.join(__dirname, './public')));

// Body-parser de type JSON fourni par Express
app.use(express.json());

app.use(routerApi);

app.listen(process.env.PORT, () => {
  console.log(`Server is currently listening on port ${process.env.PORT}`)
})