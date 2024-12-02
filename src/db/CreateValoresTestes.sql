INSERT INTO `PresenceListDB`.`PROFESSOR` (`nomeProf`, `emailProf`, `senhaProf`)
VALUES 
  ('Test Professor', 'test@prof.com', 'senha123');

INSERT INTO `PresenceListDB`.`WORKSHOP` (`nomeWork`, `dataWork`, `PROFESSOR_idProf`)
VALUES 
  ('Workshop de Teste', '2024-12-01', 1);

INSERT INTO `PresenceListDB`.`ALUNOS` (`raAlun`, `nomeAlun`)
VALUES 
  (123456, 'Aluno Teste');

INSERT INTO `PresenceListDB`.`LISTA_PRESENCA` (`ALUNOS_raAlun`, `WORKSHOP_idWork`, `WORKSHOP_PROFESSOR_idProf`)
VALUES 
  (123456, 1, 1);
