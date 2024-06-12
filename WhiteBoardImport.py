import os
import json
import sys
import requests
import mimetypes

def load_json(file_path):
    with open(file_path, 'r') as f:
        return json.load(f)

def validate_json_structure(data, required_keys, optional_keys):
    option = ""

    item_keys = set(data.keys())
    required_keys_set = set(required_keys)
    optional_keys_set = set(optional_keys)

    if item_keys.issubset(required_keys_set.union(optional_keys_set)) and required_keys_set.issubset(item_keys):
        option = "Entrada Completa"

    elif item_keys.issubset(required_keys_set.union(optional_keys_set)):
        option = "Entrada Parcial"

    return option

def post_docente(url, docente, image_path):
    mimetype = mimetypes.guess_type(image_path)[0]

    with open(image_path, 'rb') as img:
        files = {
            'foto': (image_path, img, mimetype)
        }
        data = {key: value for key, value in docente.items() if key != 'foto'}
        response = requests.post(url, files=files, data=data)

    return response.status_code == 200

def put_docente(url, aluno, image_path):
    data = {key: value for key, value in aluno.items() if key != 'foto'}
    
    if image_path:
        mimetype = mimetypes.guess_type(image_path)[0]
        with open(image_path, 'rb') as img:
            files = {
                'foto': (image_path, img, mimetype)
            }
            response = requests.put(url, files=files, data=data)
    else:
        response = requests.put(url, data=data)

    return response.status_code == 200

def post_aluno(url, aluno, image_path):
    mimetype = mimetypes.guess_type(image_path)[0]

    with open(image_path, 'rb') as img:
        files = {
            'foto': (image_path, img, mimetype)
        }
        data = {key: value for key, value in aluno.items() if key != 'foto'}
        response = requests.post(url, files=files, data=data)

    return response.status_code == 200

def put_aluno(url, aluno, image_path):
    data = {key: value for key, value in aluno.items() if key != 'foto'}
    
    if image_path:
        with open(image_path, 'rb') as img:
            mimetype = mimetypes.guess_type(image_path)[0]
            files = {
                'foto': (image_path, img, mimetype)
                }
            response = requests.put(url, files=files, data=data)
    else:
        response = requests.put(url, data=data)

    return response.status_code == 200

def post_uc(url, uc):
    response = requests.post(url, json=uc)

    return response.status_code == 200

def put_uc(url, uc):
    response = requests.put(url, json=uc)

    return response.status_code == 200

def validate_structure(urlBase, folder_path):
    # Load JSON files
    alunos_path = os.path.join(folder_path, 'alunos.json')
    docentes_path = os.path.join(folder_path, 'docentes.json')
    ucs_path = os.path.join(folder_path, 'ucs.json')

    # Images Path
    images_folder_path = os.path.join(folder_path, 'images')
    
    if (os.path.isfile(alunos_path)): 
        required_keys_alunos = ["_id", "nome", "foto", "email", "curso", "password"]
        alunos = load_json(alunos_path)

        for aluno in alunos:
            if aluno['_id'].startswith('a'):
                option = validate_json_structure(aluno, required_keys_alunos, [])
                if option == "Entrada Completa":
                    image_path = os.path.join(images_folder_path, aluno['foto'])
                    if post_aluno(urlBase+'/alunos', aluno, image_path):
                        print(f"POST ALUNO {aluno['_id']}")
                    else: # Aluno já existe
                        if aluno['foto']:
                            image_path = os.path.join(images_folder_path, aluno['foto'])
                            if put_aluno(urlBase+'/alunos/'+aluno['_id'], aluno, image_path):
                                print(f"PUT ALUNO {aluno['_id']}")
                        else:
                            put_aluno(urlBase+'/alunos/'+aluno['_id'], aluno, None)
                            print(f"PUT ALUNO {aluno['_id']}")
                elif option == "Entrada Parcial":
                    if aluno['foto']:
                        image_path = os.path.join(images_folder_path, aluno['foto'])
                        if put_aluno(urlBase+'/alunos/'+aluno['_id'], aluno, image_path):
                            print(f"PUT ALUNO {aluno['_id']}")
                        else: 
                            print(f"ALUNO {aluno['_id']} não existente -> forneça todos os campos necessários.")
                    else:
                        if put_aluno(urlBase+'/alunos/'+aluno['_id'], aluno, None):
                            print(f"PUT ALUNO {aluno['_id']}")
                        else:
                            print(f"ALUNO {aluno['_id']} não existente -> forneça todos os campos necessários.")
                else:
                    print(f"Aluno {aluno['_id']} não se encontra num formato válido!!")


    if (os.path.isfile(docentes_path)): 
        required_keys_docentes = ["_id", "nome", "foto", "categoria", "filiacao", "email", "password"]
        optional_keys_docentes = ["webpage"]
        docentes = load_json(docentes_path)

        for docente in docentes:
            if docente['_id'].startswith('d'):
                option = validate_json_structure(docente, required_keys_docentes, optional_keys_docentes)
                if option == "Entrada Completa":
                    image_path = os.path.join(images_folder_path, docente['foto'])
                    if post_docente(urlBase+'/docentes', docente, image_path):
                        print(f"POST DOCENTE {docente['_id']}")
                    else: # Docente já existe
                        if docente['foto']:
                            image_path = os.path.join(images_folder_path, docente['foto'])
                            put_docente(urlBase+'/docentes/'+docente['_id'], docente, image_path)
                            print(f"PUT DOCENTE {docente['_id']}")
                        else:
                            put_docente(urlBase+'/docentes/'+docente['_id'], docente, None)
                            print(f"PUT DOCENTE {docente['_id']}")
                elif option == "Entrada Parcial":
                    if docente['foto']:
                        image_path = os.path.join(images_folder_path, docente['foto'])
                        if put_docente(urlBase+'/docentes/'+docente['_id'], docente, image_path):
                            print(f"PUT DOCENTE {docente['_id']}")
                        else: 
                            print(f"DOCENTE {docente['_id']} não existente -> forneça todos os campos necessários.")
                    else:
                        if put_docente(urlBase+'/docentes/'+docente['_id'], docente, None):
                            print(f"PUT DOCENTE {docente['_id']}")
                        else:
                            print(f"DOCENTE {docente['_id']} não existente -> forneça todos os campos necessários.")        
                else:
                    print(f"Docente {docente['_id']} não se encontra num formato válido!!")


    if (os.path.isfile(ucs_path)): 
        required_keys_ucs = ["_id", "codUC", "titulo", "docentes", "alunos", "horario", "avaliacao", "datas", "contaAulas", "aulas", "notas"]
        ucs = load_json(ucs_path)

        for uc in ucs:
            option = validate_json_structure(uc, required_keys_ucs, [])
            if option == "Entrada Completa":
                if post_uc(urlBase+'/ucs', uc):
                    print(f"POST UC {uc['_id']}")
                else: # UC já existe
                    put_uc(urlBase+'/ucs/'+uc['_id'], uc)
                    print(f"PUT DOCENTE {uc['_id']}")
            elif option == "Entrada Parcial":
                if put_uc(urlBase+'/ucs/'+uc['_id'], uc):
                  print(f"PUT DOCENTE {uc['_id']}")
                else: 
                  print(f"UC {uc['_id']} não existente -> forneça todos os campos necessários.")        
            else:
                print(f"UC {uc['_id']} não se encontra num formato válido!!")
    
if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Uso: python3 WhiteBoardImport.py <pastaData> <mode>")
        sys.exit(1)

    if sys.argv[2] == "setup":
        urlBase = 'http://WhiteBoardAPI:10000'
    elif sys.argv[2] == "import":
        urlBase = 'http://localhost:10000'
    else:
        print("Introduza um <mode> correto -> setup ou import")
        sys.exit(1)

    validate_structure(urlBase,sys.argv[1])