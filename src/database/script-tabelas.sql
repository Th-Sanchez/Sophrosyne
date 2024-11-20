-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

CREATE DATABASE sofrosina;

USE sofrosina;

CREATE TABLE usuario (
	idUsuario int primary key auto_increment,
	nome varchar(20),
	email varchar(50),
	senha varchar(50),
	dtCriacao datetime default current_timestamp
);

CREATE TABLE post (
	idPost int auto_increment,
	fkUsuario int,
	titulo varchar(32),
	texto varchar(400),
	dtPost datetime default current_timestamp,
	constraint pkComposta primary key (idPost, fkUsuario),
	constraint fkUsuarioPost foreign key (fkUsuario)
		references usuario (idUsuario)
);

SELECT * FROM usuario;
SELECT * FROM post;

INSERT INTO usuario (nome, email, senha) VALUES
	('Thiago Sanchez', 'thibpeluci@gmail.com', 'judo2014');
    
INSERT INTO post (fkUsuario, titulo, texto) VALUES 
	(3, 'Abobrinha', 'Testetetetetetetet'),
	(3, 'Melao', 'dsaihdbisajdbna'),
	(3, 'Abacate', 'dasdsadasda'),
	(3, 'Churraco', 'gfdgdfghfhgewfsdfsd');