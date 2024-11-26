var express = require("express");
var router = express.Router();

var contaController = require("../controllers/contaController");

router.get("/totalPost/:idUsuario", function (req, res) {
    contaController.totalPost(req, res);
});

router.get("/totalCurtidas/:idUsuario", function (req, res) {
    contaController.totalCurtidas(req, res);
});

router.get("/postMaisCurtido/:idUsuario", function (req, res) {
    contaController.postMaisCurtido(req, res);
});

router.get("/numeroPostsMes/:idUsuario", function (req, res) {
    contaController.numeroPostsMes(req, res);
});

module.exports = router;