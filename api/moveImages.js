const fs = require('fs');
const path = require('path');

const sourceFolderPath = '/home/wallace/Workspace/astrobooks/api/LivrosUnzip';
const destinationFolderPath = path.join(__dirname, '/home/wallace/Workspace/astrobooks/astrobooks/public/LivrosUnzip');

// Crie o diretório de destino se não existir
if (!fs.existsSync(destinationFolderPath)) {
    fs.mkdirSync(destinationFolderPath, { recursive: true });
  }
  
  // Lista todos os arquivos na pasta de origem
  const files = fs.readdirSync(sourceFolderPath);
  
  // Move cada arquivo para o diretório de destino
  files.forEach((file) => {
    const sourceFilePath = path.join(sourceFolderPath, file);
    const destinationFilePath = path.join(destinationFolderPath, file);
  
    // Verifica se é um arquivo antes de mover
    if (fs.statSync(sourceFilePath).isFile()) {
      fs.copyFileSync(sourceFilePath, destinationFilePath);
      console.log(`Imagem movida para ${destinationFilePath}`);
    }
  });
  
  console.log('Movimentação de imagens concluída!');