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
INSERT INTO Usuario (nome, email, senha) VALUES
('Marco Aurélio', 'marco.aurelio@email.com', 'senha123'),
('Sêneca', 'seneca@email.com', 'stoico456'),
('Epicteto', 'epicteto@email.com', 'virtude789'),
('Cícero', 'cicero@email.com', 'razão101'),
('Zenão', 'zenao@email.com', 'logica202'),
('Cleanto', 'cleanto@email.com', 'natureza303'),
('Musônio Rufo', 'musonio@email.com', 'autocontrole404'),
('Crísipo', 'crisipo@email.com', 'sabedoria505'),
('Hierocles', 'hierocles@email.com', 'harmonia606'),
('Diotimo', 'diotimo@email.com', 'equilibrio707');

-- Inserindo posts (Mes atual)
INSERT INTO Post (fkUsuario, titulo, texto) 
VALUES 
(1, 'Meditações', 'A verdadeira felicidade vem de dentro.'),
(2, 'Carta a Lucílio', 'Dedique-se à filosofia como remédio para a alma.'),
(3, 'Discursos', 'A liberdade está em controlar suas reações.'),
(4, 'Virtude Estoica', 'Nada é bom ou ruim, a não ser nossas ações.'),
(5, 'Natureza Racional', 'Viver de acordo com a natureza é a chave.'),
(6, 'Sobre a Ética', 'A virtude é suficiente para a felicidade.'),
(7, 'Treinamento Estoico', 'Pratique o autocontrole em cada momento.'),
(8, 'Sobre o Logos', 'O universo é governado pela razão divina.'),
(9, 'Comunidade Estoica', 'Ame seu próximo como parte de si mesmo.'),
(10, 'Equilíbrio Estoico', 'A tranquilidade nasce da aceitação do destino.');

-- Inserindo posts (Mes diferentes)
INSERT INTO Post (fkUsuario, titulo, texto, dtPost) VALUES
(1, 'Reflexões Diárias', 'Reserve um momento do dia para refletir sobre suas ações e pensamentos.', '2024-01-12 08:00:00'),
(2, 'A Arte da Paciência', 'A paciência é uma virtude essencial para viver de forma tranquila.', '2024-02-25 14:45:00'),
(3, 'O Controle da Raiva', 'Não é o que acontece, mas como reagimos que importa.', '2024-03-10 09:30:00'),
(4, 'O Valor da Simplicidade', 'Viver com menos é viver mais próximo da natureza.', '2024-04-18 17:20:00'),
(5, 'Aceitação do Destino', 'Não lute contra o inevitável; aceite-o como parte do todo.', '2024-05-23 10:15:00'),
(6, 'Fortaleza Interna', 'A força verdadeira vem de dentro, e não de circunstâncias externas.', '2024-06-05 15:00:00'),
(7, 'Conexão Universal', 'Estamos todos interligados, como partes de um corpo maior.', '2024-07-22 12:00:00'),
(8, 'Desapego Material', 'O excesso de apego a bens é fonte de sofrimento.', '2024-08-08 16:10:00'),
(9, 'Resiliência Estoica', 'Encontre força nas adversidades e cresça com elas.', '2024-09-11 11:50:00'),
(10, 'Viver no Presente', 'Concentre-se no momento atual; é tudo o que realmente existe.', '2024-10-29 18:30:00');


-- Inserindo curtidas
INSERT INTO Curtida (fkUsuario, fkPost) 
VALUES 
(2, 1), (3, 1), (4, 1), 
(1, 2), (3, 2), (5, 2), 
(1, 3), (4, 3), (6, 3), 
(2, 4), (7, 4), (8, 4), 
(1, 5), (6, 5), (9, 5), 
(3, 6), (5, 6), (7, 6), 
(2, 7), (8, 7), (10, 7), 
(1, 8), (4, 8), (9, 8), 
(3, 9), (5, 9), (6, 9), 
(7, 10), (8, 10), (10, 10);