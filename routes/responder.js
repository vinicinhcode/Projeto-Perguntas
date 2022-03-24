const express = require('express');
const { Resposta } = require('./../models/Resposta');

const app = express.Router();

app.post('/responder/:id', async (req, res)=> {

    let id = parseInt(req.params.id);
    let corpo = req.body.resposta;

    try {

        let response = await Resposta.create({
            corpo: corpo,
            id_pergunta: id
        });

        console.log(response);
        res.json({
            status: 200,
            message: 'Adicionado resposta!'
        });

    } catch (exception) {

        res.json({
            status: 400,
            message: 'Ocorreu um erro! \n ' + exception.message
        });

    }    

});


module.exports = app;