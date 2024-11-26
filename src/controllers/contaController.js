var contaModel = require("../models/contaModel");

function totalPost(req, res) {
    var idUsuario = req.params.idUsuario;
    contaModel.totalPost(idUsuario)
        .then( 
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro contar os posts: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function totalCurtidas(req, res) {
    var idUsuario = req.params.idUsuario;
    contaModel.totalCurtidas(idUsuario)
        .then( 
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro contar os likes: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function postMaisCurtido(req, res) {
    var idUsuario = req.params.idUsuario;
    contaModel.postMaisCurtido(idUsuario)
        .then( 
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro aos buscar o post mais curtido: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function numeroPostsMes(req, res) {
    var idUsuario = req.params.idUsuario;
    contaModel.numeroPostsMes(idUsuario)
        .then( 
            function (resultado) {
                console.log(resultado)
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro aos buscar o post mais curtido: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    totalPost,
    totalCurtidas,
    postMaisCurtido,
    numeroPostsMes
}