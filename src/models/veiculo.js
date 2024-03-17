const { DataTypes } = require('sequelize');
const sequelize = require('../services/sequelize');

const Veiculo = sequelize.define('Veiculos', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    placa: {
        type: DataTypes.STRING,
        allowNull: false
    },
    chassi: {
        type: DataTypes.STRING,
        allowNull: false
    },
    renavam: {
        type: DataTypes.STRING,
        allowNull: false
    },
    modelo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    marca: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ano: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    timestamps: false
});

module.exports = Veiculo;