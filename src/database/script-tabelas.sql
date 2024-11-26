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

-- Inserindo curtidas
INSERT INTO Curtida (fkUsuario, fkPost) 
VALUES 
(2, 1), -- Maria curtiu o post do João
(3, 1), -- Carlos curtiu o post do João
(1, 2), -- João curtiu o post da Maria
(2, 3); -- Maria curtiu o post do Carlos

SELECT p.idPost, (SELECT COUNT(idCurtida) FROM Curtida WHERE fkPost = idPost), p.titulo, p.texto, p.dtPost, u.idUsuario as Dono, u.nome 
    FROM Post as p JOIN Usuario as u ON fkUsuario = idUsuario;
    
SELECT p.idPost as idPost, (SELECT COUNT(idCurtida) FROM Curtida JOIN Post ON fkPost = idPost WHERE fkPost = p.idPost) as contagemLike, p.titulo as titulo, p.texto as texto, DATE_FORMAT(p.dtPost, '%Y-%m-%d') as dataPost, u.idUsuario as Dono, u.nome as nomeUsuario FROM Post as p JOIN Usuario as u ON fkUsuario = idUsuario ORDER BY dtPost desc;
    
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

SELECT 
    Month(dtPost) as mes,
    COUNT(*) AS quantidade_posts
FROM 
    Post
WHERE 
    fkUsuario = 1
GROUP BY 
    Month(dtPost)
ORDER BY 
    Month(dtPost);
    
INSERT INTO Post (fkUsuario, titulo, texto, dtPost) VALUES 
(1, 'Reflexões Estoicas', 'Comece o ano com propósito. A disciplina é o caminho para a liberdade.', '2024-01-15 10:00:00'),
(1, 'Reflexões Estoicas', 'Resista às adversidades com coragem. Concentre-se no que você pode controlar.', '2024-02-15 10:00:00'),
(1, 'Reflexões Estoicas', 'Aceite as mudanças inevitáveis com serenidade e mantenha a mente tranquila.', '2024-03-15 10:00:00'),
(1, 'Reflexões Estoicas', 'A prática diária da virtude leva à excelência. Foque na sua ética.', '2024-04-15 10:00:00'),
(1, 'Reflexões Estoicas', 'Tudo tem o seu tempo. Cultive a paciência e aprenda a esperar.', '2024-05-15 10:00:00'),
(1, 'Reflexões Estoicas', 'Busque sempre a verdade e o conhecimento. A sabedoria é a base do estoicismo.', '2024-06-15 10:00:00'),
(1, 'Reflexões Estoicas', 'Enfrente os desafios do meio do ano com bravura e determinação.', '2024-07-15 10:00:00'),
(1, 'Reflexões Estoicas', 'Equilibre as emoções e os desejos. A virtude está no meio termo.', '2024-08-15 10:00:00'),
(1, 'Reflexões Estoicas', 'Aprecie as pequenas coisas e seja grato pelo presente.', '2024-09-15 10:00:00'),
(1, 'Reflexões Estoicas', 'O outono nos ensina a deixar ir. Seja resiliente diante das perdas.', '2024-10-15 10:00:00'),
(1, 'Reflexões Estoicas', 'Mantenha o autocontrole mesmo quando o mundo ao seu redor parece caótico.', '2024-11-15 10:00:00'),
(1, 'Reflexões Estoicas', 'Olhe para o ano que passou. Aprenda com os erros e celebre as conquistas.', '2024-12-15 10:00:00');
