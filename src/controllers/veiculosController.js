/**
 * @swagger
 * tags:
 *   name: veiculos
 *   description: manutenção de cadastro de veículos
 */

const express = require('express');
const VeiculoService = require('../services/veiculoService');
const router = express.Router();
const veiculoService = new VeiculoService();

/**
 * @swagger
 * /veiculo:
 *   get:
 *     summary: Listar um veículo
 *     tags: [veiculos]
 *     parameters:
 *        - in: query
 *          name: id
 *          required: false
 *          schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Veículo encontrado
 *       '400':
 *         description: Requisição inválida
 *       '404':
 *         description: veiculo nao encontrado       
 */
router.get('/veiculo', async (req, res) => {
    const { id } = req.query;

    try {
        var veiculo = null;
        if (id > 0) {
            veiculo = await veiculoService.getVeiculoById(id);
            if (!veiculo) {
                res.status(404).json({ error: 'Veículo não encontrado' });
            } else {
                res.json(veiculo);
            }
        }
        else {
            res.json(await veiculoService.getAll());
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /veiculo:
 *   post:
 *     summary: Cadastrar um veículo
 *     description: Cria um novo registro de veículo no sistema
 *     tags: [veiculos]
 *     requestBody:
 *       description: Dados do veículo a serem atualizados
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/veiculoInput'
 *     responses:
 *       '200':
 *         description: Veículo cadastrado com sucesso
 *       '400':
 *         description: Requisição inválida
 */
router.post('/veiculo', async (req, res) => {
    const { placa, chassi, renavam, modelo, marca, ano } = req.body;
    try {
        const veiculo = await veiculoService.createVeiculo(placa, chassi, renavam, modelo, marca, ano);
        res.status(200).json({ message: 'Veículo cadastrado com sucesso!', veiculo: veiculo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /veiculo/{id}:
 *   put:
 *     summary: Atualiza um veículo pelo ID
 *     tags: [veiculos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do veículo a ser atualizado
 *     requestBody:
 *       description: Dados do veículo a serem atualizados
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/veiculoInput'
 *     responses:
 *       '200':
 *         description: Veículo atualizado com sucesso
 *       '404':
 *         description: Veículo não encontrado
 *       '500':
 *         description: Erro ao atualizar o veículo
 */
router.put('/veiculo/:id', async (req, res) => {
    const { id } = req.params;
    const { placa, chassi, renavam, modelo, marca, ano } = req.body;
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "Requisição inválida!" });
        }
        const veiculo = await veiculoService.updateVeiculoById(id, placa, chassi, renavam, modelo, marca, ano);
        if (!veiculo) {
            res.status(404).json({ error: `Veículo com ID ${id} não foi encontrado.` });
        }
        res.json({ message: `Veículo com ID ${id} atualizado com sucesso!`, veiculo: veiculo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /veiculo/{id}:
 *   delete:
 *     summary: Excluir um veículo pelo ID
 *     description: Exclui um veículo com o ID especificado
 *     tags: [veiculos]
 *     parameters:
 *       - in: query
 *         name: id
 *         description: ID do veículo a ser excluído
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Veículo excluído com sucesso
 *       '404':
 *         description: Veículo não encontrado
 */
router.delete('/veiculo/:id', async (req, res) => {
    const { id } = req.params;
    if (!/^\d+$/.test(id)) {
        return res.status(400).json({ error: 'O parâmetro ID deve conter somente números!' });
    }
    try {
        const deletedveiculo = await veiculoService.deleteVeiculoById(id);
        if (!deletedveiculo) {
            res.status(404).json({ error: `Veículo com ID ${id} não foi encontrado.` });
        }
        res.status(200).json(deletedveiculo);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;