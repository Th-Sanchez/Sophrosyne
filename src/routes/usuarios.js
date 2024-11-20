var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/excluirConta", function (req, res) {
    usuarioController.excluirConta(req, res);
});

router.post("/trocarNome", function (req, res) {
    usuarioController.trocarNome(req, res);
});

router.post("/trocarSenha", function (req, res) {
    usuarioController.trocarSenha(req, res);
});

module.exports = router;