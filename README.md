# Mongo
A base de dados usada no nosso trabalho foi o mongodb. Nela construímos a **base de dados** denominada **WhiteBoard**, que é composta por **três coleções**, sendo estas a colecção **docentes**, a coleção **alunos** e a coleção **ucs**(unidades curriculares).

# WhiteBoardAPI
Esta aplicação é responsável por realizar pedidos à base de dados e as colocar disponíveis para posterior solicitação por parte da **WhiteBoardView**.

---
### Models / Controllers
O nosso trabalho contém quatro **models**, sendo eles o model do **aluno**, do **docente** da **uc** e do **token**.

O model do aluno contém o **alunoSchema** que reprenta a informação relativa a um aluno.

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

O model da uc é constituido pelo schema base **ucSchema**(schema da uc), o **horarioSchema**(schema do horario),o dataSchema (schema da data), o **aulaSchema** (schema da aula) e o **notaSchema** (schema das notas). 

O ucsSchema é o schema básico que pretende representar do que é composto os dados de uma UC.

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

O horarioSchema é usado para reter informações relativas às aulas teoricas e práticas, como a hora e o local onde se realizarão as mesmas.

| Atributo  | Tipo              |
|-----------|-------------------|
| teoricas  | Lista de Strings  |
| práticas  | Lista de Strings  |

O aulaSchema pretende dar informaçoes relativamente às aulas. O tipo representa se a aula é teória, prática ou laboratorial, a data corresponde à data em que a aula se realizou. Contém ainda um sumário sobre a aula selcionada.

| Atributo  | Tipo             |
|-----------|------------------|
| _id       | String           |
| tipo      | String           |
| data      | String           |
| sumario   | Lista de Strings |

O dataSchema representa quando os diferentes elementos de avalição estão marcados para serem realizados.

| Atributo  | Tipo    |
|-----------|---------|
| teste     | String  |
| exame     | String  |
| projeto   | String  |

O notaSchema pretende relacionar o aluno com os diferentes elementos de avalição que constituirão as partes que o avaliarão.

| Atributo | Tipo   |
|----------|--------|
| aluno    | String |
| teste    | String |
| exame    | String |
| projeto  | String |

O model token contém o **tokenSchema** que representa como um token é constituido.

| Atributo  | Tipo          | Descrição                                      |
|-----------|---------------|------------------------------------------------|
| token     | String        | Obrigatório                                    |
| userId    | String        | Obrigatório                                    |
| userType  | String        | Enum: ['Docente', 'Aluno'], Obrigatório        |
| createdAt | Date          | Default: Date.now, Expira em 1 dia             |

---

### Rotas 
As notas estáo vidididas em
/docentes {post}
/docentes/:id {get, put, delete} -> Marta

/alunos {post}
/alunos/:id {get, put, delete} -> Ema

/ucs {post}
/ucs/:id {get, put, delete} -> Henrique




# Rotas View
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

# Views

1 -> Marta  
2 -> Ema  
3 -> Henrique  

# WhiteBoardImport
O docker-compose faz um setup inicial de informação.
No entanto, se desejarmos adicionar mais informação, ou alterar informação previamente importada, podemos fazer essa mesma importação:

~~~
python3 WhiteBoardImport.py data import (data é a pasta com os .json e as imagens)
~~~