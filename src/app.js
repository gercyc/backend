require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const specs = require('./services/swagger');
const app = express();

app.use(express.json());
app.use(cors());
const veiculoController = require('./controllers/veiculosController');
app.use('/api', veiculoController);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });

module.exports = app.listen(process.env.PORT, () => {
    console.log(`Server is alive on http://localhost:${process.env.PORT}`);
});