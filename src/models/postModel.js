var database = require("../database/config");

function publicarPost(titulo, texto, idUsuario) {
    var instrucaoSql= `INSERT INTO Post (titulo, texto, fkUsuario) VALUES ('${titulo}', '${texto}', ${idUsuario});`
    return database.executar(instrucaoSql);
}

function carregarPosts() {
    var instrucaoSql = `SELECT p.idPost as idPost, (SELECT COUNT(idCurtida) FROM Curtida JOIN Post ON fkPost = idPost WHERE fkPost = p.idPost) as contagemLike, p.titulo as titulo, p.texto as texto, DATE_FORMAT(p.dtPost, '%Y-%m-%d') as dataPost, u.idUsuario as Dono, u.nome as nomeUsuario FROM Post as p JOIN Usuario as u ON fkUsuario = idUsuario ORDER BY dtPost DESC;`
    return database.executar(instrucaoSql);
}

function verificarLike(idPost, idUsuario) {
    var instrucaoSql = `SELECT * FROM Curtida WHERE fkPost = ${idPost} AND fkUsuario = ${idUsuario};`
    return database.executar(instrucaoSql);
}

function curtirPost(idPost, idUsuario) {
    var instrucaoSql = `INSERT INTO Curtida(fkPost, fkUsuario) VALUES (${idPost}, ${idUsuario});`
    return database.executar(instrucaoSql);
}

function descurtirPost(idPost, idUsuario) {
    var instrucaoSql = `DELETE FROM Curtida WHERE fkPost = ${idPost} AND fkUsuario = ${idUsuario};`
    return database.executar(instrucaoSql);
}

module.exports = {
    publicarPost,
    carregarPosts,
    verificarLike,
    curtirPost,
    descurtirPost
}
