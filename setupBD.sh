# Copiar arquivos JSON para dentro do contêiner Docker
docker cp data/alunos.json mongoEW:/tmp
docker cp data/docentes.json mongoEW:/tmp
docker cp data/ucs.json mongoEW:/tmp

# Executar comandos dentro do contêiner Docker
docker exec -it mongoEW bash -c "
    mongoimport -d WhiteBoard -c alunos /tmp/alunos.json --jsonArray
    
    mongoimport -d WhiteBoard -c docentes /tmp/docentes.json --jsonArray
    
    mongoimport -d WhiteBoard -c ucs /tmp/ucs.json --jsonArray
"