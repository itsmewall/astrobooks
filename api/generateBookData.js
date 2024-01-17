const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const booksFolderPath = path.join(__dirname, 'BooksUnzip');
const outputPath = path.join(__dirname, 'booksInfo');
const allBooksData = [];

// Crie o diretório de saída se não existir
if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath);
}

const generateBookData = (bookFolder) => {
  const bookFolderPath = path.join(booksFolderPath, bookFolder);
  const htmlFile = fs.readdirSync(bookFolderPath).find(file => file.endsWith('.html'));

  if (htmlFile) {
    const htmlFilePath = path.join(bookFolderPath, htmlFile);
    const $ = cheerio.load(fs.readFileSync(htmlFilePath, 'utf-8'));

    // Extraia informações do HTML conforme necessário
    const title = $('title').text().trim();
    const author = $('meta[name="author"]').attr('content');
    const coverImage = $('meta[property="og:image"]').attr('content');

    // Crie o objeto de dados do livro
    const bookData = {
      id: generateUniqueId(),
      title,
      author,
      cover: coverImage,
      content: htmlFile,
    };

    allBooksData.push(bookData);

    // Salve o arquivo de dados JSON para o livro
    const outputPathForBook = path.join(outputPath, bookFolder);
    if (!fs.existsSync(outputPathForBook)) {
      fs.mkdirSync(outputPathForBook);
    }
    const dataFilePath = path.join(outputPathForBook, 'data.json');
    fs.writeFileSync(dataFilePath, JSON.stringify(bookData, null, 2));

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
fs.readdirSync(booksFolderPath).forEach(bookFolder => {
  generateBookData(bookFolder);
});

// Salvar todos os dados em um arquivo JSON único
const allBooksFilePath = path.join(outputPath, 'allBooks.json');
fs.writeFileSync(allBooksFilePath, JSON.stringify(allBooksData, null, 2));

console.log('Todos os dados dos livros foram gerados com sucesso!');
