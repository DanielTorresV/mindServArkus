const express = require('express');
const bodyParser = require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
require('./database')
const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Mind API',
      verion: '1.0.0',
    },
  },
  apis: ['./src/routes/user.js'],
}


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(require('./routes/user'));

app.use(require('./routes/login'));

app.listen(4000, function () {
  console.log('Running port: 4000');
});