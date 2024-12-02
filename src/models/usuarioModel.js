var database = require("../database/config")

function autenticar(email, senha) {
    var instrucaoSql = `
        SELECT idUsuario, nome, email, senha FROM Usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(nome, email, senha) {
    var instrucaoSql = `
        INSERT INTO Usuario (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function excluirConta(id) {
    excluirTodosPosts(id)
    excluirCurtidas(id)
    var instrucaoSql = `
        DELETE FROM Usuario WHERE idUsuario = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function excluirTodosPosts(id) {
    var instrucaoSql = `
        DELETE FROM Post WHERE fkUsuario = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function excluirCurtidas(id) {
    var instrucaoSql = `
        DELETE FROM Curtida WHERE fkUsuario = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function excluirPost(idUsuario, idPost) {
    var instrucaoSql = `
        DELETE FROM Post WHERE fkUsuario = ${idUsuario} AND idPost = ${idPost};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function trocarNome(idUsuario, nomeUsuario) {
    var instrucaoSql = `
        UPDATE Usuario SET nome = '${nomeUsuario}' WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function trocarSenha(idUsuario, senhaUsuario) {
    var instrucaoSql = `
        UPDATE Usuario SET senha = '${senhaUsuario}' WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    excluirConta,
    excluirTodosPosts,
    excluirCurtidas,
    excluirPost,
    trocarNome,
    trocarSenha
};