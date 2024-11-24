var database = require("../database/config");

function totalPost(idUsuario) {
    var instrucaoSql = `SELECT COUNT(idPost) FROM Post WHERE fkUsuario = ${idUsuario} AS totalPost;`
    return database.executar(instrucaoSql);
}

function totalCurtidas(idUsuario) {
    var instrucaoSql = `SELECT SUM(curtidasPost) FROM (SELECT COUNT(c.idCurtida) AS curtidasPost FROM Post p LEFT JOIN Curtida c ON c.fkPost = p.idPost WHERE p.fkUsuario = ${idUsuario} GROUP BY p.idPost) AS totalCurtida;`
    return database.executar(instrucaoSql);
}

function postMaisCurtido(idUsuario) {
    var instrucaoSql = `SELECT p.titulo as titulo, p.texto as texto, COUNT(c.idCurtida) as like AS total_curtidas FROM Post p LEFT JOIN Curtida c ON c.fkPost = p.idPost WHERE p.fkUsuario = ${idUsuario} GROUP BY p.idPost ORDER BY total_curtidas DESC;`
    return database.executar(instrucaoSql);
}

module.exports = {
    totalPost,
    totalCurtidas,
    postMaisCurtido
}
