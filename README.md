# Introdução
Este trabalho tem como objetivo construir uma aplicação web que se assemelha à BlackBoard. A BlackBoard é uma aplicação que é usada para exibir as várias informações das UCS e dos alunos. Assim, durante o projeto, o nosso grupo desenvolveu a WhiteBoard.

# Mongo
A base de dados usada no nosso trabalho foi o mongodb. Nela construímos a **base de dados** denominada **WhiteBoard**, que é composta por **três coleções**, sendo estas a colecção **docentes**, a coleção **alunos** e a coleção **ucs**(unidades curriculares).

# WhiteBoardAPI
Esta aplicação é responsável por realizar pedidos à base de dados e as colocar disponíveis para posterior solicitação por parte da **WhiteBoardView**.

---
### Models / Controllers
O nosso trabalho contém quatro **models**, sendo eles o model do **aluno**, do **docente** da **uc** e do **token**.

O model do aluno contém o **alunoSchema** que representa a informação relativa a um aluno.

| Atributo | Tipo    |
|----------|---------|
| _id      | String  |
| nome     | String  |
| foto     | String  |
| email    | String  |
| curso    | String  |
| password | String  |
| token    | String  |


O model do docente contém o **docenteSchema** que representa a informação relativa a um docente. A categoria representa a profissão do docente enquanto que a filiação relaciona o docente ao departamento em que executa as suas funções.

| Atributo  | Tipo    |
|-----------|---------|
| _id       | String  |
| nome      | String  |
| foto      | String  |
| categoria | String  |
| filiacao  | String  |
| email     | String  |
| webpage   | String  |
| password  | String  |
| token     | String  |

O model da uc é constituído pelo schema base **ucSchema**, o **horarioSchema**, o dataSchema, o **aulaSchema** e o **notaSchema**.

O ucsSchema é o schema que pretende representar do que é composto os dados de uma UC.

| Atributo   | Tipo                     |
|------------|--------------------------|
| _id        | String                   |
| codUC      | String                   |
| título     | String                   |
| docentes   | Lista de Strings         |
| alunos     | Lista de Strings         |
| horario    | horarioSchema            |
| avaliação  | Lista de Strings         |
| datas      | dataSchema               |
| contaAulas | Número                   |
| aulas      | Lista de aulaSchema      |
| notas      | Lista de notaSchema      |

O horarioSchema é usado para reter informações relativas às aulas teóricas e práticas, como a hora e o local onde se realizarão as mesmas.

| Atributo  | Tipo              |
|-----------|-------------------|
| teoricas  | Lista de Strings  |
| práticas  | Lista de Strings  |

O aulaSchema pretende dar informações relativamente às aulas. O tipo representa se a aula é teórica, prática ou laboratorial, a data corresponde à data em que a aula se realizou. Contém ainda um sumário sobre a aula selecionada.


| Atributo  | Tipo             |
|-----------|------------------|
| _id       | String           |
| tipo      | String           |
| data      | String           |
| sumario   | Lista de Strings |

O dataSchema representa quando os diferentes elementos de avaliação estão marcados para serem realizados.

| Atributo  | Tipo    |
|-----------|---------|
| teste     | String  |
| exame     | String  |
| projeto   | String  |

O notaSchema pretende relacionar o aluno com os diferentes elementos de avaliação que constituirão as partes que o avaliarão.

| Atributo | Tipo   |
|----------|--------|
| aluno    | String |
| teste    | String |
| exame    | String |
| projeto  | String |

O model token contém o **tokenSchema** que representa como um token é constituído.

| Atributo  | Tipo          | Descrição                                      |
|-----------|---------------|------------------------------------------------|
| token     | String        | Obrigatório                                    |
| userId    | String        | Obrigatório                                    |
| userType  | String        | Enum: ['Docente', 'Aluno'], Obrigatório        |
| createdAt | Date          | Default: Date.now, Expira em 1 dia             |

---
### Rotas 
Existem três controlers, sendo eles o **aluno**, **docente** e **uc**, que farão queries à base de dados.

O controler do aluno contém as seguintes funções:
- **findByID:** Devolve o aluno com o id passado como argumento.

- **insert:** Insere um aluno na base de dados.

- **update:** Atualiza o aluno cujo id foi passado como argumento, na base de dados, como os dados atualizados passados por argumento.

- **delete:** Dado um id, elimina o aluno com essa id.

- **insertToken:** Dado um token, associa o token ao id passado como argumento, armazenando-o na base de dados.

O controler do docente contém as seguintes funções exatamente as mesma funções que o controler do aluno, sendo apenas relativo ao docente ao invés do aluno

O controler da UC contém as funções apresentadas no controler do aluno, ajustadas para serem relativas às UCs. Contém ainda as seguintes funções:
- **findGradesByID:** Dado o id de um aluno, devolve as notas do mesmo a todas as UCs em que está inscrito.

- **findGradesByIDAndUC:** Dado o id de um aluno e o id de uma UC, devolve as notas do aluno a essa UC.

- **deleteAula:** Dado o id da UC, remove da UC que contém esse id a aula que corresponde ao id da aula passado por argumento.

- **ucsAluno:** Dado o id do aluno, verifica em que UCS este se encontra inscrito.

- **ucsDocente:** Dado o id do docente, verifica em que UCS este se encontra inscrito.

- **addDocente:** Dado o id do docente, adiciona-o aos docentes da UC associada ao UC passado como argumento.

- **addAluno:** Dado o id do aluno, adiciona-o aos alunos da UC associada ao UC passado como argumento.

---
### Rotas  FALTA FAZERRRRRRR
As notas estáo vidididas em
/docentes {post}
/docentes/:id {get, put, delete} -> Marta

/alunos {post}
/alunos/:id {get, put, delete} -> Ema

/ucs {post}
/ucs/:id {get, put, delete} -> Henrique


# WhiteBoardView
Esta aplicação é responsável por realizar pedidos à WhiteBoardAPI e representar os dados obtidos em páginas web.

---

### Views
O **layout** apresenta as configurações base das diversas páginas que se seguem.

O **login** apresenta ao utilizador 2 caixas de texto onde devem ser colocados o identificador do aluno ou docente e a sua palavra-passe, para que o utilizador se possa autenticar. Após se autenticar, o utilizador será reencaminhado para a página inicial.

A **paginaInicial** exibe ao utilizador todas as UCs em que está inscrito. Quando clicar numa UC, o utilizador é redirecionado para a página dessa UC. Caso o utilizador clique na sua foto, que é apresentada no canto superior direito, então será direcionado para o seu perfil.

A **perfil** exibe as informações do utilizador como a sua foto, o seu nome, email... As informações são ajustadas consoante o utilizador é um docente ou aluno, pois estes contém informações diferentes. Esta página contém um botão que redireciona o utilizador para uma página onde se poderá registar em UCS e outro botão que redireciona o utilizador para um página onde pode modificar as suas informações. No caso de ser um aluno, será ainda exibido outro botão, que encaminhá-lo-á para uma página onde poderá ver as suas notas. É apresentado um botão que permite ao utilizador sair da aplicação, direcionando-o para a página de login. Existe ainda um botão que permite o utilizador retroceder, voltando para a página inicial.

A **alunoVerNotas** exibe ao aluno as notas que este teve às diferentes UCS a que está inscrito. Existe um botão que permite ao aluno retroceder, voltando para o perfil.

A **increverUC** pede ao utilizador que introduza o identificador e o código da UC. Se as informações foram introduzidas corretamente, o utilizador será reencaminhado para o perfil. Caso as informações dadas estejam erradas, então o utilizador é reencaminhado para uma página em que lhe será exibido o erro que ocorreu. Existe ainda um botão que permite ao utilizador retroceder, voltando para o perfil.

A **editarPerfil** exibe as informações atuais do utilizador, permitindo alterá-las. Existe um botão para o utilizador submeter as alterações realizadas ao seu perfil. Existe ainda um botão que permite o utilizador retroceder e, assim, voltar ao seu perfil.

A **InformacaoesUC** exibe as informações relativas a uma UC (como as datas dos teste, horas das aulas...) e as informações relativas às diversas aulas. No caso do docente, existem três botões adicionais, um que redireciona o docente para uma página onde poderá visualizar as notas dos seus alunos, outra em que permite dar notas aos alunos e um último que permite adicionar aulas. Existe ainda um botão que permite o utilizador retroceder, voltando à página principal.

A **novaAula** permite ao docente adicionar uma aula. Para tal, tem de preencher o tipo, a data e p sumário da aula para a poder submeter. Existe assim um botão para submeter a aula. Existe ainda um botão que permite o docente voltar à página da UC.

A **verNotasDocentes** apresenta ao docente as notas de todos os alunos aos diferentes elementos de avaliação e apresenta ainda algumas informações relativas às notas, como a média, a percentagem de reprovados e a percentagem de alunos que ainda não foram avaliados a cada um dos elementos de avaliação. Apresenta um botão que permite que o docente volte à página da UC.

A **modificarNotas** apresenta ao docente todos os campos das notas dos alunos, para que possam introduzir notas ou as modificar. Existe uma barra de pesquisa que permite que o docente pesquise por um aluno. Caso o aluno exista, o docente é reencaminhado para uma página onde apenas serão exibidas as informações desse aluno. Caso o aluno não exista, o docente é reencaminhado para uma página que lhe informa que o aluno não existe. Existe um botão que permite ao docente submeter as diversas notas que, quando clicado, redireciona-o para a página da UC e outro que permite ao docente voltar à página da UC.

A **modificarNotasAluno** exibe as notas do aluno, caso este as tenha, e permite ao docente modificar as mesmas ou adicioná-las. Existe um botão para o docente submeter as notas que quando clicado redireciona o docente para a página onde atribui as notas aos diversos alunos. Existe ainda um botão para que o utilizador possa retroceder, redirecionando-o para a mesma página.

A **error** é a página que é exibida quando algum erro ocorre. Essa página exibe o erro que ocorreu e contém um botão para que o utilizador possa voltar à página em que se encontrava.


### Rotas FALTA FAZER
/ -> Login  
/registoAluno -> registoAluno  
/registoDocente -> registoDocente  
/paginaInicial/:idDocente?token=tokenDocente -> paginaInicial  
/paginaInicial/:idAluno?token=tokenAluno -> paginaInicial  

/ucs/:idUC/aluno/:idAluno?token=tokenAluno -> Uc de um certo id, versão aluno. As aulas aparecem ordenadas ao contrário temporalmente  
/ucs/:idUC/docente/:idDocente?token=tokenDocente -> Uc de um certo id, versão docente. As aulas aparecem ordenadas ao contrário temporalmente  
/ucs/:idUC/docente/:idDocente/editar?token=tokenDocente -> Editar informações de docentes, horários ...  
/ucs/:idUC/docente/:idDocente/notas?token=tokenDocente -> Vê notas dos alunos numa determinada UC  
/ucs/:idUC/docente/:idDocente/modificarNotas?token=tokenDocente -> Modifica as notas. Os alunos aparecem ordenados alfabeticamente  
/ucs/:idUC/docente/:idDocente/adicionarAula?token=tokenDocente -> Adiciona aula a uma determinada UC.  
/ucs/:idUC/docente/:idDocente/eliminarAula/:idAula?token=tokenDocente -> Para eliminar uma aula  
/perfil/:idUser?token=tokenUser -> perfil (idUser pode ser docente ou aluno)  
/perfil/:idUser/editar?token=tokenUser -> editar informações do perfil (idUser pode ser docente ou aluno)  
/perfil/:idUser/inscreverUC?token=tokenUser -> inscrever em UC (idUser pode ser docente ou aluno)    
/perfil/:idAluno/notas?token=tokenUser -> ver as notas (id aluno)  

# WhiteBoardImport
O docker-compose faz um setup inicial de informação.
No entanto, se desejarmos adicionar mais informação, ou alterar informação previamente importada, podemos fazer essa mesma importação:

~~~
python3 WhiteBoardImport.py data import (data é a pasta com os .json e as imagens)
~~~