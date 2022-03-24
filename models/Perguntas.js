const Sequelize = require('sequelize');
const { connection } = require('./Database');

const Perguntas = connection.define('tb_perguntas', {

    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },

    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }

});

Perguntas.sync({ force: false });

module.exports = { Perguntas }