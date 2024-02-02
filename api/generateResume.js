const fs = require('fs');
const path = require('path');

// Caminho para a pasta com os resumos
const resumosFolderPath = path.join(__dirname, 'resumos');

// Array para armazenar os objetos de informações dos livros
const livros = [];

// Iterar sobre cada arquivo na pasta de resumos
fs.readdirSync(resumosFolderPath).forEach(file => {
    // Verificar se é um arquivo TXT
    if (path.extname(file) === '.txt') {
        const filePath = path.join(resumosFolderPath, file);
        let livro = {
            id: livros.length + 1,
            capitulos: []
        };
        const conteudo = fs.readFileSync(filePath, 'utf-8');
        const linhas = conteudo.split('\n');
        
        let capitulo = {};
        let resumo = '';
        let conteudoCapitulo = ''; // Adicionado para armazenar o conteúdo antes do resumo
        let tituloEncontrado = false; // Variável para controlar se o título foi encontrado

        // Iterar sobre as linhas para extrair os dados do livro
        let ignoreFirstLine = true; // Variável para ignorar a primeira linha do conteúdo
        linhas.forEach((linha, index) => {
            if (linha.match(/^\d+\./)) {
                // Checar se há um capítulo anterior a este
                if (Object.keys(capitulo).length !== 0) {
                    capitulo.resumo = resumo.trim();
                    capitulo.conteudo = conteudoCapitulo.trim(); // Adicionado para incluir o conteúdo antes do resumo
                    livro.capitulos.push(capitulo);
                    capitulo = {};
                    resumo = '';
                    conteudoCapitulo = ''; // Limpar o conteúdo do capítulo atual
                }
                const numeroCapitulo = parseInt(linha.split('.')[0].trim());
                const tituloCapitulo = linha.split('.')[1].trim();
                capitulo = {
                    id: numeroCapitulo,
                    titulo: tituloCapitulo
                };
            } else if (linha.startsWith('Titulo:')) {
                if (!tituloEncontrado) {
                    livro.nome = linha.replace('Titulo:', '').trim(); // Extrai o nome do livro
                    tituloEncontrado = true; // Marca que o título foi encontrado
                }
            } else if (linha.startsWith('Resumo:')) {
                resumo = linha.replace('Resumo:', '').trim();
            } else if (linha.startsWith('Autor:')) {
                livro.autor = linha.replace('Autor:', '').trim();
            } else if (linha.startsWith('Editora:')) {
                livro.editora = linha.replace('Editora:', '').trim();
            } else if (linha.startsWith('Edição:')) {
                livro.edicao = linha.replace('Edição:', '').trim();
            } else if (linha.startsWith('Ano:')) {
                livro.ano = parseInt(linha.replace('Ano:', '').trim());
            } else if (linha.startsWith('Gênero:')) {
                livro.genero = linha.replace('Gênero:', '').trim();
            } else if (linha.startsWith('Idioma:')) {
                livro.idioma = linha.replace('Idioma:', '').trim();
            } else if (linha.startsWith('Resenha:')) {
                livro.resenha = linha.replace('Resenha:', '').trim();
            } else {
                // Se não for nenhum dos elementos acima e não for a primeira linha, considera como conteúdo do livro
                if (!ignoreFirstLine) {
                    conteudoCapitulo += linha + '\n';
                } else {
                    ignoreFirstLine = false; // Altera a flag após a primeira linha
                }
            }
        });

        // Adicionar o último capítulo
        if (Object.keys(capitulo).length !== 0) {
            capitulo.resumo = resumo.trim();
            capitulo.conteudo = conteudoCapitulo.trim(); // Adicionado para incluir o conteúdo antes do resumo
            livro.capitulos.push(capitulo);
        }

        livros.push(livro);
        console.log(`Resumo do livro ${livro.nome} processado com sucesso!`);
    }
});

// Objeto para armazenar os livros no formato JSON
const data = {
    livro: livros
};

// Caminho para o arquivo de saída JSON
const outputFilePath = path.join(__dirname, 'booksInfo', 'livro.json');

// Escrita dos dados em formato JSON no arquivo de saída
fs.writeFileSync(outputFilePath, JSON.stringify(data, null, 2));

console.log('Todos os resumos foram processados e salvos com sucesso no arquivo livro.json');
