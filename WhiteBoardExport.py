import os
import json
import sys
import requests
import time
import shutil

global tokenAdmin

def load_image(file_path, image):
    with open(file_path, 'wb') as f:
        f.write(image)


def load_json(file_path):
    with open(file_path, 'r') as f:
        return json.load(f)
    

def write_json(file_path, data):
    with open(file_path, 'w', encoding='utf-8') as f:
        return json.dump(data, f, ensure_ascii=False, indent=4)


def autenticar_admin(url):
    try:
        response = requests.get(url)

        return response.text
    
    except Exception:
        time.sleep(1)
        return autenticar_admin(url)
    
    
def get_admins(url):
    try:
        response = requests.get(url)

        return response.json()
    
    except Exception:
        time.sleep(1)
        return get_admins(url)
    

def get_docentes(url):
    try:
        response = requests.get(url)

        return response.json()
    
    except Exception:
        time.sleep(1)
        return get_docentes(url)
    

def get_alunos(url):
    try:
        response = requests.get(url)

        return response.json()
    
    except Exception:
        time.sleep(1)
        return get_alunos(url)
    

def get_ucs(url):
    try:
        response = requests.get(url)

        return response.json()
    
    except Exception:
        time.sleep(1)
        return get_ucs(url)
    

def get_image(url):
    try:
        response = requests.get(url)

        return response.content
    
    except Exception:
        time.sleep(1)
        return get_image(url)


def exportData(urlBase):
    # Importa o tokenAdmin para o scope local da função
    global tokenAdmin

    folder_path = './dataExport'
    images_path = folder_path + '/images'
    admins_path = './data/admins.json'

    # Verifica se a pasta já existe
    if os.path.exists(folder_path):
        shutil.rmtree(folder_path)

    os.mkdir(folder_path)
    os.mkdir(images_path)

    if (os.path.isfile(admins_path)): 
        admins = load_json(admins_path)
        
        for admin in admins:
            tokenAdmin = autenticar_admin(urlBase+'/admins/'+admin['_id']+'/autenticar?password='+admin['password'])

    admins = get_admins(urlBase+'/admins?userID=admin1&token='+tokenAdmin)
    write_json(folder_path+'/admins.json', admins)

    docentes = get_docentes(urlBase+'/docentes?userID=admin1&token='+tokenAdmin)
    write_json(folder_path+'/docentes.json', docentes)

    for docente in docentes:
        image = get_image("http://localhost:10000/filestore/"+docente['foto'])
        load_image(images_path+'/'+ docente['foto'], image)

    alunos = get_alunos(urlBase+'/alunos?userID=admin1&token='+tokenAdmin)
    write_json(folder_path+'/alunos.json',alunos)

    for aluno in alunos:
        image = get_image("http://localhost:10000/filestore/"+aluno['foto'])
        load_image(images_path+'/'+ aluno['foto'], image)

    ucs = get_ucs(urlBase+'/ucs?userID=admin1&token='+tokenAdmin)
    write_json(folder_path+'/ucs.json',ucs)


if __name__ == "__main__":
    if len(sys.argv) != 1:
        print("Uso: python3 WhiteBoardExport.py")
        sys.exit(1)

    urlBase = 'http://localhost:10000'

    exportData(urlBase)