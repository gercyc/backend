require('dotenv').config();
const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3001;
const protocol = process.env.HTTPS === 'TRUE' ? 'https' : 'http';
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Teste - Info Sistemas e Tecnologia',
            version: '1.0',
            description: 'Teste aplicado pela Info no processo seletivo.',
        },
        servers: [
            {
                url: `${protocol}://${host}:${port}/api`,
                description: 'Servidor local',
            }
        ],
        components: {
            schemas: {
                veiculoInput: {
                    type: 'object',
                    properties: {
                        placa: { type: 'string' },
                        chassi: { type: 'string' },
                        renavam: { type: 'string' },
                        modelo: { type: 'string' },
                        marca: { type: 'string' },
                        ano: { type: 'integer' }
                    },
                },
            },
        },
    },
    apis: [path.resolve(__dirname, '../controllers/*.js')]
};

const specs = swaggerJsdoc(options);

module.exports = specs;