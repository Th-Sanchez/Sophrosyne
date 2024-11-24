var express = require("express");
var router = express.Router();

var contaController = require("../controllers/contaController");

router.post("/publicarPost", function (req, res) {
    contaController.publicarPost(req, res);
});

module.exports = router;