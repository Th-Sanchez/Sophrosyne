var postModel = require("../models/postModel");

function publicarPost(req, res) {
    var titulo = req.body.tituloServer;
    var texto = req.body.textoServer;
    var idUsuario = req.body.idUsuario;

    if (titulo == undefined) {
        res.status(400).send("O título está indefinido!");
    } else if (texto == undefined) {
        res.status(400).send("A descrição está indefinido!");
    } else if (idUsuario == undefined) {
        res.status(403).send("O id do usuário está indefinido!");
    } else {
        postModel.publicarPost(titulo, texto, idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            )
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function carregarPosts(req, res) {
    postModel.carregarPosts()
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function verificarLike(req, res) {
    var idPost = req.params.idPost;
    var idUsuario = req.params.idUsuario;

    postModel.verificarLike(idPost, idUsuario)
        .then(
            function (resultado) {
                console.log(resultado.length)
                if (resultado.length == 0) {
                    return res.status(204).send()
                }
                return res.status(200).json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao buscar o like: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function curtirPost(req, res) {
    var idPost = req.body.idPostServer;
    var idUsuario = req.body.idUsuarioServer;

    postModel.curtirPost(idPost, idUsuario)
        .then(
            function (resultado) {
                console.log(resultado.length)
                if (resultado.length == 0) {
                    return res.status(204).send()
                }
                return res.status(200).json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao buscar o like: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function descurtirPost(req, res) {
    var idPost = req.body.idPostServer;
    var idUsuario = req.body.idUsuarioServer;

    postModel.descurtirPost(idPost, idUsuario)
        .then(
            function (resultado) {
                console.log(resultado.length)
                if (resultado.length == 0) {
                    return res.status(204).send()
                }
                return res.status(200).json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao buscar o like: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    publicarPost,
    carregarPosts,
    verificarLike,
    curtirPost,
    descurtirPost
}