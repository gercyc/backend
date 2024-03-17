const request = require('supertest');
const app = require('../app');
const assert = require('assert');
var veiculoCriado = {};

describe('Testes do Controller de Veículos', () => {

    describe('GET /veiculo', () => {
        it('Deve obter um array de veículos', async () => {
            const response = await request(app)
                .get('/api/veiculo');

            assert.strictEqual(response.status, 200);
            assert(Array.isArray(response.body));
        });
    });

    describe('POST /veiculo', () => {
        it('Deve criar um novo veículo', async () => {
            const response = await request(app)
                .post('/api/veiculo')
                .send({
                    placa: 'GNP7E58',
                    chassi: '142536968574',
                    renavam: '142536968574',
                    modelo: 'Monza Classic SE',
                    marca: 'Chevrolet',
                    ano: 1990
                });

            assert.strictEqual(response.status, 200);
            assert.strictEqual(response.body.message, 'Veículo cadastrado com sucesso!');
            assert.strictEqual(response.body.veiculo.placa, 'GNP7E58');
            assert.strictEqual(response.body.veiculo.chassi, '142536968574');
            assert.strictEqual(response.body.veiculo.renavam, '142536968574');
            assert.strictEqual(response.body.veiculo.modelo, 'Monza Classic SE');
            assert.strictEqual(response.body.veiculo.marca, 'Chevrolet');
            assert.strictEqual(response.body.veiculo.ano, 1990);
            veiculoCriado = response.body.veiculo;
        });

        it('Deve retornar um erro ao criar um veículo com dados inválidos', async () => {
            const response = await request(app)
                .post('/api/veiculo')
                .send({
                    // Dados inválidos
                });

            assert.strictEqual(response.status, 500);
        });
    });

    describe('PUT /veiculo', () => {
        it('Deve atualizar o veiculo que foi criado no método POST', async () => {
            veiculoCriado.placa = "ATUALIZADO PELO PUT";
            veiculoCriado.chassi = "ATUALIZADO PELO PUT";
            veiculoCriado.renavam = "ATUALIZADO PELO PUT";
            veiculoCriado.modelo = "ATUALIZADO PELO PUT";
            veiculoCriado.marca = "ATUALIZADO PELO PUT";
            veiculoCriado.ano = 9999;

            const response = await request(app)
                .put(`/api/veiculo/${veiculoCriado.id}`)
                .send({
                    placa: veiculoCriado.placa,
                    chassi: veiculoCriado.chassi,
                    renavam: veiculoCriado.renavam,
                    modelo: veiculoCriado.modelo,
                    marca: veiculoCriado.marca,
                    ano: veiculoCriado.ano
                });

            assert.strictEqual(response.status, 200);
            assert.strictEqual(response.body.message, `Veículo com ID ${veiculoCriado.id} atualizado com sucesso!`);
            assert.strictEqual(response.body.veiculo.id, veiculoCriado.id);
            assert.strictEqual(response.body.veiculo.placa, veiculoCriado.placa);
            assert.strictEqual(response.body.veiculo.chassi, veiculoCriado.chassi);
            assert.strictEqual(response.body.veiculo.renavam, veiculoCriado.renavam);
            assert.strictEqual(response.body.veiculo.modelo, veiculoCriado.modelo);
            assert.strictEqual(response.body.veiculo.marca, veiculoCriado.marca);
            assert.strictEqual(response.body.veiculo.ano, veiculoCriado.ano);
        });

        it('Deve retornar um erro ao atualizar um veículo com dados inválidos', async () => {
            const response = await request(app)
                .put(`/api/veiculo/${veiculoCriado.id}`)
                .send({
                    // Dados inválidos
                });

            assert.strictEqual(response.status, 400);
        });
    });

    describe('DELETE /veiculo', () => {
        it('Deve remover o veiculo que foi criado no método POST', async () => {
            const response = await request(app)
                .delete(`/api/veiculo/${veiculoCriado.id}`);
            assert.strictEqual(response.status, 200);
        });

        it('Deve retornar erro se for enviado um id invalido', async () => {
            const response = await request(app)
                .delete('/api/veiculo/a');
            assert.strictEqual(response.status, 400);
        });
    });

    after(() => {
        process.exit();
    })
});