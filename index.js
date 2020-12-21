var express = require('express');
require('dotenv').config();
var morgan = require('morgan');

var PORT = process.env.PORT || 3000;

var routes = require('./routes');
const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(morgan('combined'))


app.use('', routes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});