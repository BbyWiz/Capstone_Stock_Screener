// server/docs.js
const swaggerJsdoc = require('swagger-jsdoc');
const { version } = require('./package.json');

const options = {
  definition: {
    openapi: '3.0.3',
    info: { title: 'Intelligent Stock Screener API', version },
  },
  apis: ['./app.js'], // JSDoc in routes
};

module.exports = swaggerJsdoc(options);
