import zipfile
import os

def extrair_zip(caminho_zip, pasta_destino):
    with zipfile.ZipFile(caminho_zip, 'r') as zip_ref:
        zip_ref.extractall(pasta_destino)

# Substitua os caminhos pelos seus caminhos específicos
pasta_arquivos_zip = r"./Livros"
pasta_destino_unzip = r"./LivrosUnzip"

# Iterar sobre os arquivos ZIP na pasta
for arquivo_zip in os.listdir(pasta_arquivos_zip):
    if arquivo_zip.endswith(".zip"):
        caminho_zip = os.path.join(pasta_arquivos_zip, arquivo_zip)

        # Garantir que a pasta de destino seja única para cada arquivo ZIP
        pasta_destino_arquivo = os.path.join(pasta_destino_unzip, arquivo_zip.replace(".zip", ""))
        os.makedirs(pasta_destino_arquivo, exist_ok=True)

        # Extrair o conteúdo do arquivo ZIP
        extrair_zip(caminho_zip, pasta_destino_arquivo)

        print(f"Extração concluída para {pasta_destino_arquivo}")

print("Processo concluído.")