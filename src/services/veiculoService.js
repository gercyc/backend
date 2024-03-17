const veiculoModel = require('../models/veiculo');

class VeiculoService {
    async createVeiculo(placa, chassi, renavam, modelo, marca, ano) {
        try {
            const veiculo = await veiculoModel.create({ placa, chassi, renavam, modelo, marca, ano });
            return veiculo;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getAll() {
        try {
            const veiculo = await veiculoModel.findAll();
            return veiculo;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getVeiculoById(id) {
        try {
            const veiculo = await veiculoModel.findByPk(id);
            return veiculo;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updateVeiculoById(id, placa, chassi, renavam, modelo, marca, ano) {
        try {
            const veiculo = await veiculoModel.findByPk(id);
            if (!veiculo) {
                return null;
            }
            veiculo.placa = placa;
            veiculo.chassi = chassi;
            veiculo.renavam = renavam;
            veiculo.modelo = modelo;
            veiculo.marca = marca;
            veiculo.ano = ano;
            await veiculo.save();
            return veiculo;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteVeiculoById(id) {
        try {
            const veiculo = await veiculoModel.findByPk(id);
            if (!veiculo) {
                return null
            }
            await veiculo.destroy();
            return { message: `Veículo com ID ${id} excluído com sucesso!` };
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = VeiculoService;