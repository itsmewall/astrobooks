const fs = require('fs');
const path = require('path');

const resumosFolderPath = path.join(__dirname, 'resumos');
const livros = [];

fs.readdirSync(resumosFolderPath).forEach(file => {
    if (path.extname(file) === '.txt') {
        const filePath = path.join(resumosFolderPath, file);
        const nomeDoArquivoSemExtensao = path.parse(file).name;

        let livro = {
            id: livros.length + 1,
            capitulos: [],
        };
        const conteudo = fs.readFileSync(filePath, 'utf-8');
        const linhas = conteudo.split('\n');

        let capitulo = {};
        let resumo = '';
        let conteudoCapitulo = '';
        let tituloEncontrado = false;
        let ignoreFirstLine = true;

        linhas.forEach((linha, index) => {
            if (linha.match(/^\d+\./)) {
                if (Object.keys(capitulo).length !== 0) {
                    capitulo.resumo = resumo.trim();
                    capitulo.conteudo = conteudoCapitulo.trim();
                    livro.capitulos.push(capitulo);
                    capitulo = {};
                    resumo = '';
                    conteudoCapitulo = '';
                }

                const numeroCapitulo = parseInt(linha.split('.')[0].trim());
                const tituloCapitulo = linha.split('.')[1].trim();
                capitulo = {
                    id: numeroCapitulo,
                    titulo: tituloCapitulo,
                };

            } else if (linha.startsWith('Titulo:')) {
                if (!tituloEncontrado) {
                    livro.nome = linha.replace('Titulo:', '').trim();
                    const nomeDaImagem = nomeDoArquivoSemExtensao
                    .toLowerCase()
                    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') 
                    .replace(/\s+/g, '-')
                    .replace(/[^a-z0-9\-]/g, '');
                livro.coverImage = `/capas/${nomeDaImagem}.jpg`;
                console.log(`Capa do livro ${livro.nome} encontrada!`);
                tituloEncontrado = true;
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
                if (!ignoreFirstLine) {
                    conteudoCapitulo += linha + '\n';
                } else {
                    ignoreFirstLine = false;
                }
            }
        });

        if (Object.keys(capitulo).length !== 0) {
            capitulo.resumo = resumo.trim();
            capitulo.conteudo = conteudoCapitulo.trim(); 
            livro.capitulos.push(capitulo);
        }

        livros.push(livro);
        console.log(`AstroBooks: ${livro.nome} adicionado!`);
    }
});

const data = {
    livro: livros,
};

const outputFilePath = path.join(__dirname, 'booksInfo', 'livro.json');

fs.writeFileSync(outputFilePath, JSON.stringify(data, null, 2));

console.log('AstroBooks: Books info generated successfully!');