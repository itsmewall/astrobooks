import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

def download_book(book_url, title, save_path):
    # Realiza uma nova requisição para a página do livro
    book_response = requests.get(book_url)

    if book_response.status_code == 200:
        # Parse do HTML da página do livro
        book_soup = BeautifulSoup(book_response.text, 'html.parser')

        # Extrair o título do livro
        title_element = book_soup.find('h1', itemprop='name')
        title = title_element.text.strip() if title_element else "Untitled"

        # Substituir caracteres inválidos por '_'
        title = title.replace('/', '_').replace('\\', '_').replace(':', '_').replace('*', '_').replace('?', '_').replace('"', '_').replace('<', '_').replace('>', '_').replace('|', '_')

        # Encontrar o link para o arquivo ZIP do HTML
        zip_link = book_soup.find('a', {'type': 'application/zip', 'class': 'link', 'title': 'Download'})

        if not zip_link:
            # Se não encontrar, tenta outra abordagem
            zip_link = book_soup.find('a', {'href': True, 'type': 'application/zip'})

        if zip_link:
            # Construir a URL completa para o arquivo ZIP
            zip_url = urljoin(book_url, zip_link['href'])

            # Construir o caminho completo para salvar o arquivo
            save_file_path = os.path.join(save_path, f"{title}.zip")

            # Realizar o download do arquivo ZIP
            zip_response = requests.get(zip_url)

            if zip_response.status_code == 200:
                # Salvar o conteúdo do arquivo ZIP localmente
                with open(save_file_path, "wb") as zip_file:
                    zip_file.write(zip_response.content)
                print(f"Download do arquivo ZIP para '{title}' concluído com sucesso!")
            else:
                print(f"Falha ao baixar o arquivo ZIP para '{title}'. Código de status: {zip_response.status_code}")
        else:
            print(f"Link para o arquivo ZIP não encontrado para '{title}'.")
    else:
        print(f"Falha ao acessar a página do livro para '{title}'. Código de status: {book_response.status_code}")

def main():
    # URL da página principal
    url = "https://www.gutenberg.org/browse/languages/pt"
    
    # Diretório para salvar os livros
    save_path = r"./books"

    # Verifica se a pasta existe
    if not os.path.exists(save_path):
        print(f"A pasta de destino '{save_path}' não existe. Crie a pasta antes de continuar.")
        return

    # Realiza a requisição HTTP
    response = requests.get(url)

    # Verifica se a requisição foi bem-sucedida
    if response.status_code == 200:
        # Parse do HTML
        soup = BeautifulSoup(response.text, 'html.parser')

        # Encontrar todos os elementos <li> com a classe 'pgdbetext'
        book_elements = soup.find_all('li', class_='pgdbetext')

        for book_element in book_elements:
            # Extrair o link do livro
            book_link = book_element.find('a')['href']
            book_url = urljoin(url, book_link)

            # Realizar o download do livro
            download_book(book_url, title="", save_path=save_path)
    else:
        print(f"Falha ao acessar a página principal. Código de status: {response.status_code}")

if __name__ == "__main__":
    main()