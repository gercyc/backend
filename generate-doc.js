const fs = require('fs');
const swaggerSpec = require('./src/services/swagger');

fs.writeFileSync('swagger.json', JSON.stringify(swaggerSpec, null, 2));