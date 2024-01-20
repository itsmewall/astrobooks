const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const booksUnzipFolderPath = path.join(__dirname, 'LivrosUnzip');
const booksInfoFolderPath = path.join(__dirname, 'booksinfo');
const allBooksData = [];

// Crie o diretório de saída se não existir
if (!fs.existsSync(booksInfoFolderPath)) {
  fs.mkdirSync(booksInfoFolderPath);
}

const generateBookData = (bookFolder) => {
  const bookFolderPath = path.join(booksUnzipFolderPath, bookFolder);
  const htmlFile = fs.readdirSync(bookFolderPath).find(file => file.endsWith('.html'));

  if (htmlFile) {
    const htmlFilePath = path.join(bookFolderPath, htmlFile);
    const $ = cheerio.load(fs.readFileSync(htmlFilePath, 'utf-8'));

    // Extraia informações do HTML conforme necessário
    const title = $('title').text().trim();
    const author = $('meta[name="author"]').attr('content');

    // Lista para armazenar informações sobre as imagens
    const images = [];

    // Iterar sobre todos os arquivos na pasta do livro
    fs.readdirSync(bookFolderPath).forEach(file => {
      const imagePath = path.join(bookFolderPath, file);
      // Verifique se o arquivo é uma imagem (pode ajustar para outros tipos de imagens)
      if (fs.statSync(imagePath).isFile() && /\.(jpg|jpeg|png|gif)$/i.test(file)) {
        images.push(imagePath);
      }
    });

    // Crie o objeto de dados do livro
    const bookData = {
      id: generateUniqueId(),
      title,
      author,
      images,
    };

    allBooksData.push(bookData);
    console.log(`Dados do livro ${bookFolder} gerados com sucesso!`);
  } else {
    console.log(`HTML não encontrado para o livro ${bookFolder}`);
  }
};

const generateUniqueId = () => {
  // Gere um ID único usando lógica personalizada (por exemplo, timestamp, aleatório, etc.)
  // Neste exemplo, estou usando um timestamp simples
  return new Date().getTime();
};

// Iterar sobre cada pasta de livro
fs.readdirSync(booksUnzipFolderPath).forEach(bookFolder => {
  generateBookData(bookFolder);
});

// Salvar todos os dados em um arquivo JSON único
const allBooksFilePath = path.join(booksInfoFolderPath, 'allBooks.json');
fs.writeFileSync(allBooksFilePath, JSON.stringify(allBooksData, null, 2));

console.log('Todos os dados dos livros foram gerados com sucesso!');
