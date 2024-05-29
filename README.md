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