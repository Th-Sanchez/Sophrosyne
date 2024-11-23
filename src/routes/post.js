var express = require("express");
var router = express.Router();

var postController = require("../controllers/postController");

router.post("/publicarPost", function (req, res) {
    postController.publicarPost(req, res);
});

router.get("/carregarPosts", function (req, res) {
    postController.carregarPosts(req, res);
});

router.get("/verificarLike/:idPost/:idUsuario", function (req, res) {
    postController.verificarLike(req, res);
});

module.exports = router;