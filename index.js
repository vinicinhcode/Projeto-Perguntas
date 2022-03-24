const express = require('express');
const path =  require('path');
const httpServer =  require('http');
const bodyParser =  require('body-parser');
const perguntar = require('./routes/perguntar');
const responder = require('./routes/responder');

const app = express();
const http = httpServer.createServer(app);

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(perguntar);
app.use(responder);


http.listen(3000, ()=> console.log("Servidor online!"));

module.exports =  http;