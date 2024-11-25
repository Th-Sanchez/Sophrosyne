-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

CREATE DATABASE sofrosina;

USE sofrosina;

CREATE TABLE Usuario (
	idUsuario int primary key auto_increment,
	nome varchar(20),
	email varchar(50),
	senha varchar(50),
	dtCriacao datetime default current_timestamp
);

CREATE TABLE Post (
	idPost int auto_increment,
	fkUsuario int,
	titulo varchar(32),
	texto varchar(400),
	dtPost datetime default current_timestamp,
	constraint pkCompostaPost primary key (idPost, fkUsuario),
	constraint fkUsuarioPost foreign key (fkUsuario)
		references Usuario (idUsuario)
);

CREATE TABLE Curtida (
	idCurtida int auto_increment,
    fkUsuario int,
    fkPost int,
    constraint pkCompostaCurtida primary key (idCurtida, fkUsuario, fkPost),
    constraint fkUsuarioCurtida foreign key (fkUsuario)
		references Usuario (idUsuario),
	constraint fkPostCurtida foreign key (fkPost)
		references Post (idPost)
);

SELECT * FROM usuario;
SELECT * FROM post;
SELECT * FROM curtida;
  
-- Inserindo usuários
INSERT INTO Usuario (nome, email, senha) 
VALUES 
('João Silva', 'joao@email.com', 'senha123'),
('Maria Oliveira', 'maria@email.com', 'senha456'),
('Carlos Lima', 'carlos@email.com', 'senha789');

-- Inserindo posts
INSERT INTO Post (fkUsuario, titulo, texto) 
VALUES 
(1, 'Meu Primeiro Post', 'Este é o texto do meu primeiro post.'),
(2, 'Dicas de Programação', 'Aqui estão algumas dicas úteis para programadores.'),
(3, 'Viagem dos Sonhos', 'Relato da minha viagem inesquecível.');

INSERT INTO Post (fkUsuario, titulo, texto, dtPost) VALUES
	(1, 'sdjgfbishjd', 'dfjiognsjodfnsjf', '2024-11-22');

-- Inserindo curtidas
INSERT INTO Curtida (fkUsuario, fkPost) 
VALUES 
(2, 1), -- Maria curtiu o post do João
(3, 1), -- Carlos curtiu o post do João
(1, 2), -- João curtiu o post da Maria
(2, 3); -- Maria curtiu o post do Carlos

SELECT p.idPost, (SELECT COUNT(idCurtida) FROM Curtida WHERE fkPost = idPost), p.titulo, p.texto, p.dtPost, u.idUsuario as Dono, u.nome 
    FROM Post as p JOIN Usuario as u ON fkUsuario = idUsuario;
    
SELECT DATE_FORMAT(dtPost, '%Y-%m-%d') FROM post;

SELECT SUM((SELECT COUNT(idCurtida) FROM Curtida WHERE fkPost = (SELECT idPost FROM Post WHERE fkUsuario = 1))) FROM Post JOIN Curtida ON fkPost = idPost;

SELECT SUM(curtidas_por_post) 
FROM (
    SELECT COUNT(c.idCurtida) AS curtidas_por_post
    FROM Post p
    LEFT JOIN Curtida c ON c.fkPost = p.idPost
    WHERE p.fkUsuario = 1
    GROUP BY p.idPost
) AS subconsulta;

SELECT p.titulo as titulo, p.texto as texto, COUNT(c.idCurtida) as total_curtidas FROM Post p LEFT JOIN Curtida c ON c.fkPost = p.idPost WHERE p.fkUsuario = 1 GROUP BY p.idPost ORDER BY total_curtidas DESC LIMIT 1;