const express = require('express');
const { Perguntas } = require('./../models/Perguntas');
const { Resposta } = require('./../models/Resposta');

const router = express.Router();


router.get('/', async (req, res)=>{

    try {

        const perguntas = await Perguntas.findAll({ 
            raw: true,
            order: [['id', 'DESC']]
        });

        res.render('index/index', {
            title: 'Página inicial',
            perguntas: perguntas
        });

    } catch(ex) {

        res.setHeader('json', 'text/json');
        res.send({
            status: 400,
            message: 'Não foi possível carregar a página'
        });

    }

});

router.get('/perguntar', (req, res) => {

    res.render('perguntar/index', {
        title: 'Faça sua pergunta'
    });

});

router.post('/perguntar', async (req, res) => {

    res.setHeader('json', 'text/json');

    try {

        var response = await Perguntas.create({
            titulo: req.body.title,
            descricao: req.body.description
        });

        res.send({
            status: 200,
            message: 'Pergunta inserida'
        });

    } catch(ex) {

        res.send({
            status: 400,
            message: ex.message
        });

    }

});

router.get('/pergunta/:id', async(req, res) => {

    try {

        const id = parseInt(req.params.id);
        const pergunta = await Perguntas.findOne({ where: {id} });

        if(pergunta != undefined) {

            const respostas = await Resposta.findAll({
                where: { id_pergunta: id },
                order: [['id', 'DESC']]
            });

            console.log(respostas);

            res.render('perguntar/visualizar', {
                title: 'Visualizar pergunta',
                pergunta: pergunta,
                respostas: respostas
            });

        } else {

            res.setHeader('json', 'text/json');
            res.send({
                status: 400,
                message: 'Erro: nenhuma pergunta encontrada.'
            });

        }

    } catch(ex) {

        res.setHeader('json', 'text/json');
        res.send({
            status: 400,
            message: `Erro: ${ex.message}`
        });

    }

});


module.exports = router;