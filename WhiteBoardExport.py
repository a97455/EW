import os
import json
import sys
import requests
import time

global tokenAdmin

def load_json(file_path):
    with open(file_path, 'r') as f:
        return json.load(f)
    

def write_json(file_path):
    with open(file_path, 'w') as f:
        return json.load(f)


def autenticar_admin(url):
    try:
        response = requests.get(url)

        return response.text
    
    except Exception:
        time.sleep(1)
        return autenticar_admin(url)


def exportData(urlBase):
    # Importa o tokenAdmin para o scope local da função
    global tokenAdmin

    folder_path = './dataExport'
    admins_path = './data/admins.json'

    os.mkdir(folder_path)

    if (os.path.isfile(admins_path)): 
        admins = load_json(admins_path)
        
        for admin in admins:
            tokenAdmin = autenticar_admin(urlBase+'/admins/'+admin['_id']+'/autenticar?password='+admin['password'])



    return 


if __name__ == "__main__":
    if len(sys.argv) != 1:
        print("Uso: python3 WhiteBoardExport.py")
        sys.exit(1)

    urlBase = 'http://WhiteBoardAPI:10000'

    exportData(urlBase)