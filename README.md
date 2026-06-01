# Simulado-Senac-7

O intuito deste simulado é principalmente mostrar minhas HABILIDADES e treinar para a competição.

---

# Estrutura:

* Sistema monólito com:
<p>
- Tabela de usuarios
<p>
- Tabela de chamados

---

# Ferramentas utilizadas:

## Aplicativos:
<p>
- Mysql Server;
<p>

- Mysql Workbench;
<p>

- Insomnia;
<p>

- VsCode;
<p>

- Git;
<p>



## Bibliotecas:

```json
{
    "require": {
        "firebase/php-jwt": "^7.0",
        "respect/validation": "^2.4",
        "vlucas/phpdotenv": "^5.6"
    }
}
```


---

# Como rodar:

* Primeiramente instale o `Mysql SERVER` junto com o `Mysql Workbench`. Após isto, inicie o VSCODE e abra uma novo terminal `BASH`.

- DIGITE:

```bash
git clone https://github.com/RicardoFM1/Simulado-Senac-7.git .

```


* Então Abra outro terminal `CMD` e DIGITE: 

```
cd Simulado-Senac-7/Backend/Routes
php -S localhost:3000

```

* No Workbench, abra um novo script e COLE:

```sql
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema sistema_chamados
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema sistema_chamados
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `sistema_chamados` DEFAULT CHARACTER SET utf8 ;
USE `sistema_chamados` ;

-- -----------------------------------------------------
-- Table `sistema_chamados`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sistema_chamados`.`usuarios` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(255) NOT NULL,
  `tipo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sistema_chamados`.`chamados`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sistema_chamados`.`chamados` (
  `id_chamado` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(45) NOT NULL,
  `descricao` VARCHAR(45) NOT NULL,
  `setor` VARCHAR(45) NOT NULL,
  `prioridade` VARCHAR(45) NOT NULL,
  `status` VARCHAR(45) NOT NULL DEFAULT 'aberto',
  `usuario_idusuario` INT NOT NULL,
  `data` TIMESTAMP NULL,
  PRIMARY KEY (`id_chamado`),
  INDEX `fk_chamados_usuarios_idx` (`usuario_idusuario` ASC) VISIBLE,
  CONSTRAINT `fk_chamados_usuarios`
    FOREIGN KEY (`usuario_idusuario`)
    REFERENCES `sistema_chamados`.`usuarios` (`id_usuario`)
    ON DELETE RESTRICT
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

set time_zone = '-03:00';


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

``` 

--- 

## .ENV:

Crie um arquivo no backend chamado `.ENV`:
<p>
E siga o exemplo do arquivo .env.example.

---


# Rotas:
<p>
Rotas de usuários: 
<p>

Rota: /usuario, Métodos:
<p>
GET
<p>
POST
<p>

Exemplo de JSON:

```json
"nome": "Ricardo",
"email": "Ricardo@gmail.com",
"senha": "12345678",
"tipo": "administrador"

```

--- 

Rota: /usuario/login, Métodos:
<p>
POST
<p>

Exemplo de JSON:

```json

"email": "Ricardo@gmail.com",
"senha": "12345678"


```

--- 

Rotas de chamados: 
Rota: /chamado, Métodos:
<p>
GET
<p>
POST
<p>
PUT
<p>

Exemplo de JSON:

```json
"titulo": "Erro na impressora",
"descricao": "Deu erro na impressão",
"setor": "RH",
"prioridade": "média",
"status": "aberto",
"usuario_idusuario": "1"

```

É possivel filtrar por status também:
<p>
/chamado?status=aberto com o Método GET
<p>
/chamado?id_usuario&status=aberto com o Método GET.


