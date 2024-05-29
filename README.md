# Rotas CRUD
/docentes {post}
/docentes/:id {get, put, delete} -> Marta

/alunos {post}
/alunos/:id {get, put, delete} -> Ema

/ucs {post}
/ucs/:id {get, put, delete} -> Henrique


# Models / Controllers
UC: sigla, titulo, lista de schema docente, lista de schema aluno, schema horario, schema avaliacao, schema data, lista de schema aula -> Henrique

Docente: ver no docentes.json -> Marta

Aluno: ver no alunos.json -> Ema

Horario: lista de teoricas (strings) e lista de praticas (strings) -> Henrique

Avaliacao: lista de strings -> Henrique

Data: ver na ucs.json -> Henrique

Aula: tipo, data e sumario (lista strings) -> Henrique