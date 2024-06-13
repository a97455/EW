# Relatório WhiteBoard

### Engenharia Web 2024

Proposta 5: Gerador de websites para UC


### Equipa CRUDers:

- Ema Maria Monteiro Martins (A97678)
- Henrique Nuno Marinho Malheiro (A97455)
- Marta Sofia Matos Castela Queirós Gonçalves (A100593)

## Introdução

Para este projeto decidimos implementar a WhiteBoard, uma plataforma inspirada na BlackBoard que conta com um processo de autenticação de alunos e docentes, dando-lhes depois acesso a informações sobre as Unidades Curriculares em que estão inscritos. Os docentes de cada UC conseguem alterar as informações acerca da mesma ou acrescentar conteúdo novo, como as aulas ou as notas dos alunos. Os alunos podem consultar as suas notas e as informações disponibilizadas nas UCs em que estão inscritos.

## Modelo de dados

O nosso modelo de dados divide-se em 3 categorias, alunos, docentes e ucs.

Cada aluno apresenta um id que corresponde ao seu número de aluno, o seu nome, uma foto, o email, o curso em que se encontra, uma password e um token para a autenticação.

Os docentes têm um id, o nome, uma foto, uma categoria, a sua filiação, o email, uma password e um token para a autenticação. Além disso podem ter uma webpage.

Para termos uma uc, é necessário um id, um código para inscrição na UC, um título, uma lista de ids de docentes, uma lista de ids de alunos, um horário constituído por 2 listas de horários de aulas (práticas e teóricas), uma lista das avaliações, as datas do teste, do exame e do projeto, um contador das aulas, uma lista de aulas que incluem um id, um tipo, uma data e um sumário e ainda uma lista de notas que associam o id do aluno às suas classificações nos instrumentos de avaliação.

Estes dados estão no formato jsonArray de forma a serem importados para o mongo, sendo que as fotos são guardadas nestes modelos apenas através de uma string que corresponde ao nome do ficheiro. Optamos por guardar as imagens com um nome que corresponde ao identificador do utilizador seguido do mimetype da imagem de forma a garantir que não aparecem imagens com nomes repetidos. As imagens em si são guardadas na pasta FileStore e através do nome conseguimos acesso às mesmas.

### Importação de dados 

A importação de dados é feita através de um script python `WhiteBoardImport`.py por um administrador. Para isso espera-se ter uma pasta (data) que pode conter os ficheiros `alunos.json`, `docentes.json` e `ucs.json`. As imagens necessárias devem estar guardadas numa pasta images na diretoria data.

O script formulado tenta realizar o POST ou PUT das informações após realizar diversas verificações:

- Ids dos alunos começam por 'a' e dos docentes começam por 'd' já que é um critério utilizado na implementação para distinguis alunos de docentes;

- Estrutura json válida, percebendo-se se a estrutura recebida corresponde a uma entrada completa daquele tipo, a uma entrada parcial ou se não está de acordo com as informações pretendidas. Para isso utilizam-se arrays de chaves obrigatórias e opcionais tentando-se perceber se as informações correspondem ou não ao que era esperado;

- O parâmetro foto, existindo, tem uma correspondência com esse nome na pasta images.

Após todas estas verificações tenta-se fazer um POST no caso de a entrada ser completa ou um PUT caso a entrada seja apenas parcial ou o POST não funcione, de forma a substituir a informação já existente pois damos prioridade à informação importada sobre a que já se encontra no mongo.

O script dá ainda algum feedback sobre a importação e possíveis erros que possam ter ocorrido, permitindo ao administrador identificar os problemas e corrigi-los mais facilmente se necessário.

### Exportação de dados

## WhiteBoardAPI

A nossa API de dados (WhiteBoardAPI) conecta-se à base de dados WhiteBoard do container WhiteBoardMongo através do mongoose.

Para cada uma das coleções definimos os seguintes pedidos:

- Docentes: get do docente através do id, post, put, delete e get dos dados para autenticação

- Alunos: get do aluno através do id, post, put, delete, get dos dados para autenticação e get das notas do aluno

- UCs: get da UC através do id, post, put, delete, get das ucs em que um aluno/docente está inscrito, put de um novo aluno/docente na UC e delete de uma aula da UC

A WhiteBoardAPI recebe estes pedidos através da porta 10000.

## WhiteBoardView

A WhiteBoardView disponibiliza a nossa interface a partir da porta 10001, fazendo pedidos à WhiteBoardAPI sempre que há necessidade de obter informações sobre os alunos, os docentes ou as ucs.

### Autenticação

### Páginas

## Docker

### Como correr



