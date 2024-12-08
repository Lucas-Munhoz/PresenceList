-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema presencelistdb_test
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `presencelistdb_test` ;

-- -----------------------------------------------------
-- Schema presencelistdb_test
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `presencelistdb_test` DEFAULT CHARACTER SET utf8 ;
USE `presencelistdb_test` ;

-- -----------------------------------------------------
-- Table `presencelistdb_test`.`PROFESSOR`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `presencelistdb_test`.`PROFESSOR` ;

CREATE TABLE IF NOT EXISTS `presencelistdb_test`.`PROFESSOR` (
  `idProf` INT NOT NULL AUTO_INCREMENT,
  `nomeProf` VARCHAR(80) NOT NULL,
  `emailProf` VARCHAR(80) NOT NULL,
  `senhaProf` VARCHAR(16) NOT NULL,
  PRIMARY KEY (`idProf`),
  UNIQUE INDEX `emailProf_UNIQUE` (`emailProf` ASC) VISIBLE,
  UNIQUE INDEX `idPROFESSOR_UNIQUE` (`idProf` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `presencelistdb_test`.`WORKSHOP`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `presencelistdb_test`.`WORKSHOP` ;

CREATE TABLE IF NOT EXISTS `presencelistdb_test`.`WORKSHOP` (
  `idWork` INT NOT NULL AUTO_INCREMENT,
  `nomeWork` VARCHAR(20) NOT NULL,
  `dataWork` DATE NOT NULL,
  `PROFESSOR_idProf` INT NOT NULL,
  PRIMARY KEY (`idWork`, `PROFESSOR_idProf`),
  UNIQUE INDEX `nomeWork_UNIQUE` (`nomeWork` ASC) VISIBLE,
  UNIQUE INDEX `idWork_UNIQUE` (`idWork` ASC) VISIBLE,
  INDEX `fk_WORKSHOP_PROFESSOR1_idx` (`PROFESSOR_idProf` ASC) VISIBLE,
  CONSTRAINT `fk_WORKSHOP_PROFESSOR1`
    FOREIGN KEY (`PROFESSOR_idProf`)
    REFERENCES `presencelistdb_test`.`PROFESSOR` (`idProf`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `presencelistdb_test`.`ALUNOS`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `presencelistdb_test`.`ALUNOS` ;

CREATE TABLE IF NOT EXISTS `presencelistdb_test`.`ALUNOS` (
  `raAlun` INT NOT NULL,
  `nomeAlun` VARCHAR(80) NOT NULL,
  PRIMARY KEY (`raAlun`),
  UNIQUE INDEX `raAlun_UNIQUE` (`raAlun` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `presencelistdb_test`.`LISTA_PRESENCA`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `presencelistdb_test`.`LISTA_PRESENCA` ;

CREATE TABLE IF NOT EXISTS `presencelistdb_test`.`LISTA_PRESENCA` (
  `ALUNOS_raAlun` INT NOT NULL,
  `WORKSHOP_idWork` INT NOT NULL,
  `WORKSHOP_PROFESSOR_idProf` INT NOT NULL,
  PRIMARY KEY (`ALUNOS_raAlun`, `WORKSHOP_idWork`, `WORKSHOP_PROFESSOR_idProf`),
  INDEX `fk_WORKSHOP_has_ALUNOS_ALUNOS1_idx` (`ALUNOS_raAlun` ASC) VISIBLE,
  INDEX `fk_LISTA_PRESENCA_WORKSHOP1_idx` (`WORKSHOP_idWork` ASC, `WORKSHOP_PROFESSOR_idProf` ASC) VISIBLE,
  CONSTRAINT `fk_WORKSHOP_has_ALUNOS_ALUNOS1`
    FOREIGN KEY (`ALUNOS_raAlun`)
    REFERENCES `presencelistdb_test`.`ALUNOS` (`raAlun`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_LISTA_PRESENCA_WORKSHOP1`
    FOREIGN KEY (`WORKSHOP_idWork` , `WORKSHOP_PROFESSOR_idProf`)
    REFERENCES `presencelistdb_test`.`WORKSHOP` (`idWork` , `PROFESSOR_idProf`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
