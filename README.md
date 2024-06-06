# Mongo
db name -> WhiteBoard

collections names -> docentes, alunos, ucs

# Rotas CRUD
/docentes {post}
/docentes/:id {get, put, delete} -> Marta

/alunos {post}
/alunos/:id {get, put, delete} -> Ema

/ucs {post}
/ucs/:id {get, put, delete} -> Henrique


# Models / Controllers
UC: _id (sigla da uc), titulo, lista de ids de docentes, lista de ids de alunos, schema horario, avaliacao (lista Strings), schema data, lista de schema aula -> Henrique

Docente: ver no docentes.json -> Marta

Aluno: ver no alunos.json -> Ema

Horario: lista de teoricas (strings) e lista de praticas (strings) -> Henrique

Data: ver na ucs.json -> Henrique

Aula: tipo, data e sumario (lista strings) -> Henrique

# Rotas View
/ -> Login  
/registoAluno -> registoAluno  
/registoDocente -> registoDocente  
/paginaInicial/:id -> paginaInicial (id pode ser docente ou aluno)  

/ucs/:id/docente -> Uc de um certo id, versão docente  
/ucs/:id/aluno -> Uc de um certo id, versão aluno  
/ucs/:id/docente/editar -> Editar informações de docentes, horários, etc ...  
/ucs/:id/docente/adicionarAula -> Adicionar aulas à UC  

/perfil/:id -> perfil (id pode ser docente ou aluno)  
/perfil/:id/editar -> editar informações do perfil  
/perfil/:id/inscreverUC -> inscrever em UC (id pode ser docente ou aluno)  


# Views

1 -> Marta
2 -> Ema
3 -> Henrique