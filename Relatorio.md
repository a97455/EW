# Relatório WhiteBoard

### Engenharia Web 2024

Proposta 5: Gerador de websites para UC


### Equipa CRUDers:

- Ema Maria Monteiro Martins (A97678)
- Henrique Nuno Marinho Malheiro (A97455)
- Marta Sofia Matos Castela Queirós Gonçalves (A100593)

## Introdução

Explicar o que decidimos implementar


## Modelo de dados

O nosso modelo de dados divide-se em 3 categorias, alunos, docentes e ucs.

Cada aluno apresenta um id que corresponde ao seu número de aluno, o seu nome, uma foto, o email, o curso em que se encontra, uma password e um token para a autenticação.

Os docentes têm um id, o nome, uma foto, uma categoria, a sua filiação, o email, uma password e um token para a autenticação. Além disso podem ter uma webpage.

Para termos uma uc, é necessário um id, um código para inscrição na UC, um título, uma lista de ids de docentes, uma lista de ids de alunos, um horário constituído por 2 listas de horários de aulas (práticas e teóricas), uma lista das avaliações, as datas do teste, do exame e do projeto, um contador das aulas, uma lista de aulas que incluem um id, um tipo, uma data e um sumário e ainda uma lista de notas que associam o id do aluno às suas classificações nos instrumentos de avaliação.

Estes dados estão no formato jsonArray de forma a serem importados para o mongo, sendo que as fotos são guardadas nestes modelos apenas através de uma string que corresponde ao nome do ficheiro. Optamos por guardar as imagens com um nome que corresponde ao identificador do utilizador seguido do mimetype da imagem de forma a garantir que não aparecem imagens com nomes repetidos. As imagens em si são guardadas na pasta FileStore e através do nome conseguimos acesso às mesmas.

### Importação de dados 

#### Verificações

### Exportação de dados

## WhiteBoardAPI

A nossa API de dados (WhiteBoardAPI) conecta-se à base de dados WhiteBoard do container WhiteBoardMongo através do mongoose.

Para cada uma das coleções definimos os seguintes pedidos:

- Docentes: get do docente através do id, post, put, delete e get dos dados para autenticação

- Alunos: get do aluno através do id, post, put, delete, get dos dados para autenticação e get das notas do aluno

- UCs: get da UC através do id, post, put, delete, get das ucs em que um aluno/docente está inscrito, put de um novo aluno/docente na UC e delete de uma aula da UC

A WhiteBoardAPI recebe estes pedidos através da porta 10000.

## WhiteBoardView



### Autenticação

### Páginas

## Docker



