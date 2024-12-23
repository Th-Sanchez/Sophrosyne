var database = require("../database/config");

function totalPost(idUsuario) {
    var instrucaoSql = `SELECT COUNT(idPost) AS totalPost FROM Post WHERE fkUsuario = ${idUsuario};`
    return database.executar(instrucaoSql);
}

function totalCurtidas(idUsuario) {
    var instrucaoSql = `SELECT SUM(curtidasPost) AS totalCurtidas FROM (SELECT COUNT(c.idCurtida) AS curtidasPost FROM Post p LEFT JOIN Curtida c ON c.fkPost = p.idPost WHERE p.fkUsuario = ${idUsuario} GROUP BY p.idPost) as postsCurtidosUsuario;`
    return database.executar(instrucaoSql);
}

function postMaisCurtido(idUsuario) {
    var instrucaoSql = `SELECT p.titulo as titulo, p.texto as texto, COUNT(c.idCurtida) as totalCurtidas FROM Post p LEFT JOIN Curtida c ON c.fkPost = p.idPost WHERE p.fkUsuario = ${idUsuario} GROUP BY p.idPost ORDER BY totalCurtidas DESC LIMIT 1;`
    return database.executar(instrucaoSql);
}

function numeroPostsMes(idUsuario) {
    var instrucaoSql = `SELECT Month(dtPost) as mes, COUNT(*) AS qtdPosts FROM Post WHERE fkUsuario = ${idUsuario} GROUP BY Month(dtPost) ORDER BY Month(dtPost);`
    return database.executar(instrucaoSql);
}

module.exports = {
    totalPost,
    totalCurtidas,
    postMaisCurtido,
    numeroPostsMes
}
