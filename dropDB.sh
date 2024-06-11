# Executar comandos dentro do contêiner Docker
docker exec -it mongoEW mongosh --eval "
    db = db.getSiblingDB('WhiteBoard');
    db.dropDatabase();
"