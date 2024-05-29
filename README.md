# Rotas CRUD
/docentes {post}
/docentes/:id {get, put, delete}

/alunos {post}
/alunos/:id {get, put, delete}

/ucs {post}
/ucs/:id {get, put, delete}


# Models
UC: sigla, titulo, lista de schema docente, lista de schema aluno, schema horario, schema avaliacao, schema data, lista de schema aula

Docente: ver no docentes.json

Aluno: ver no alunos.json

Horario: lista de teoricas (strings) e lista de praticas (strings)

Avaliacao: lista de strings

Data: ver na ucs.json

Aula: tipo, data e sumario (lista strings)