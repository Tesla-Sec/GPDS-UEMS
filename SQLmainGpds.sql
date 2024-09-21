/* Lógico Sistema de Comentários: */
CREATE TABLE pessoa (
primeiro_nome VARCHAR(50),
nome_meio VARCHAR(50),
ultimo_nome VARCHAR(50),
email VARCHAR(50),
cpf VARCHAR(11) PRIMARY KEY,
endereco VARCHAR(255)
);
CREATE TABLE feedback (
numero INT PRIMARY KEY,

nota INT,
comentario VARCHAR(255),
curso_codigo INT,
usuario_cpf VARCHAR(11),
nivel INT
);
CREATE TABLE curso (
descricao VARCHAR(255),
nome VARCHAR(50),
codigo INT PRIMARY KEY,
professor_matricula INT,
cpf_pessoa VARCHAR(11)
);
CREATE TABLE login (
usuario VARCHAR(50) PRIMARY KEY,
senha VARCHAR(50),
cpf_pessoa VARCHAR(11)
);
CREATE TABLE FREQUENTA (
curso_codigo INT,
estado VARCHAR(50),
aluno_matricula INT,
cpf_pessoa VARCHAR(11)
);
CREATE TABLE credencial (
cpf_pessoa VARCHAR(11),
ator_matricula INT PRIMARY KEY,
ator_titulo VARCHAR(20)
);
ALTER TABLE feedback ADD CONSTRAINT FK_feedback_2
FOREIGN KEY (usuario_cpf)
REFERENCES pessoa (cpf);
ALTER TABLE feedback ADD CONSTRAINT FK_feedback_3
FOREIGN KEY (curso_codigo)

REFERENCES curso (codigo);
ALTER TABLE curso ADD CONSTRAINT FK_curso_2
FOREIGN KEY (cpf_pessoa)
REFERENCES pessoa (cpf);
ALTER TABLE login ADD CONSTRAINT FK_login_2
FOREIGN KEY (cpf_pessoa)
REFERENCES pessoa (cpf);
ALTER TABLE FREQUENTA ADD CONSTRAINT FK_FREQUENTA_1
FOREIGN KEY (cpf_pessoa)
REFERENCES pessoa (cpf);
ALTER TABLE FREQUENTA ADD CONSTRAINT FK_FREQUENTA_2
FOREIGN KEY (curso_codigo)
REFERENCES curso (codigo);
ALTER TABLE credencial ADD CONSTRAINT FK_credencial_1
FOREIGN KEY (cpf_pessoa)
REFERENCES pessoa (cpf);
