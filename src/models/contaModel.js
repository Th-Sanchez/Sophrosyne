var database = require("../database/config");

function totalPost(idUsuario) {
    var instrucaoSql = `SELECT COUNT(idPost) AS totalPost FROM Post WHERE fkUsuario = ${idUsuario};`
    return database.executar(instrucaoSql);
}

function totalCurtidas(idUsuario) {
    var instrucaoSql = `SELECT SUM(curtidasPost) AS totalCurtida FROM (SELECT COUNT(c.idCurtida) AS curtidasPost FROM Post p LEFT JOIN Curtida c ON c.fkPost = p.idPost WHERE p.fkUsuario = ${idUsuario} GROUP BY p.idPost) as postsCurtidosUsuario;`
    return database.executar(instrucaoSql);
}

function postMaisCurtido(idUsuario) {
    var instrucaoSql = `SELECT p.titulo as titulo, p.texto as texto, COUNT(c.idCurtida) as totalCurtidas FROM Post p LEFT JOIN Curtida c ON c.fkPost = p.idPost WHERE p.fkUsuario = ${idUsuario} GROUP BY p.idPost ORDER BY totalCurtidas DESC;`
    return database.executar(instrucaoSql);
}

module.exports = {
    totalPost,
    totalCurtidas,
    postMaisCurtido
}
