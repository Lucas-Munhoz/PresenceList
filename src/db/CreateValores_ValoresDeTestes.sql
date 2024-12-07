INSERT INTO `presencelistdb_test`.`PROFESSOR` (`nomeProf`, `emailProf`, `senhaProf`)
VALUES 
  ('Test Professor', 'test@prof.com', 'senha123');

INSERT INTO `presencelistdb_test`.`WORKSHOP` (`nomeWork`, `dataWork`, `PROFESSOR_idProf`)
VALUES 
  ('Workshop de Teste', '2024-12-01', 1);

INSERT INTO `presencelistdb_test`.`ALUNOS` (`raAlun`, `nomeAlun`)
VALUES 
  (123456, 'Aluno Teste');

INSERT INTO `presencelistdb_test`.`LISTA_PRESENCA` (`ALUNOS_raAlun`, `WORKSHOP_idWork`, `WORKSHOP_PROFESSOR_idProf`)
VALUES 
  (123456, 1, 1);
