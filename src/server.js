const express = require('express');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
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

app.use(require('./routes/user'));


app.listen(4000, function () {
  console.log('Running port: 4000');
});