# Mongo
db name -> WhiteBoard

collections names -> docentes, alunos, ucs

# Rotas CRUD (Faltam bastantes rotas que foram adicionadas posteriormente)
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

## Faltam meter as rotas com tokens

/perfil/:idUser/editar?token=tokenUser -> editar informações do perfil (idUser pode ser docente ou aluno)  
/perfil/:idUser/inscreverUC?token=tokenUser -> inscrever em UC (idUser pode ser docente ou aluno)    
/perfil/:idAluno/notas?token=tokenUser -> ver as notas (id aluno)  

# Views

1 -> Marta
2 -> Ema
3 -> Henrique