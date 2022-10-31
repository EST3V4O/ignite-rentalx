**RF** => Requisitos funcionais

**RNF** => Requisitos não funcionais

**RN** => Regra de negócio

# Cadastro de Carro

**RF**
- [] Deve ser possível cadastra um novo carro
<!-- - [] Deve ser possível listar todas as categorias -->

**RN**
- [] Não de ser possível castrar um carro com uma placa já existente
<!-- - [] Não deve ser possível alterar a placa de uma carro já cadastrado -->
- [] O carro deve ser cadastrado, por padrão com disponibilidade
- [] O usuário responsável pelo cadastro dever ser um usuário administrador

# Listagem de carros

**RF**
- [] Dever ser possível listar todos os carros disponíveis
- [] Dever ser possível listar todos os carros disponíveis pelo nome da categoria
- [] Dever ser possível listar todos os carros disponíveis pelo nome da marca
- [] Dever ser possível listar todos os carros disponíveis pelo nome do carro

**RN**
- [] O usuário não precisa estar logado no sistema

# Cadastro de Especificação no Carro

**RF**
- [] Deve ser possível cadastrar uma especificação para um carro
- [] Deve ser possível listar todas as especificações
- [] Deve ser possível listar todos os carros
- [] O usuário responsável pelo cadastro dever ser um usuário administrador

**RN**
- [] Não deve ser possível cadastrar uma especificação para um carro não cadastrado
- [] Não deve ser possível uma especificação ja existente para o mesmo carro

# Cadastro de imagens do carro

**RF**
- [] Deve ser possível cadastrar a imagem do carro
- [] Deve ser possível listar todos os carros

**RNF**
Utilizar o multer para upload dos arquivos

**RN**
- [] O usuário deve poder cadastrar mais de uma imagem para o mesmo carro
- [] O usuário responsável pelo cadastro dever ser um usuário administrador
- [] Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível

# Aluguel de carro

**RF**
- [] Deve ser possível cadastrar um aluguel 

**RNF**

**RN**
- [] O aluguel deve ter duração minima de 24 horas
- [] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário
- [] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro