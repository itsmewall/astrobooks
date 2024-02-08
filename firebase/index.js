const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('./astrobooks-aa565-firebase-adminsdk-qnt96-f0c489866a.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Verificar status da assinatura
app.get('/api/assinatura/:uid', async (req, res) => {
    const uid = req.params.uid;
    try {
      const userRef = db.collection('users').doc(uid);
      const doc = await userRef.get();
      if (doc.exists) {
        res.json({ assinaturaAtiva: doc.data().assinaturaAtiva || false });
      } else {
        res.status(404).json({ error: 'FB: Usuário não encontrado' });
      }
    } catch (error) {
      console.error('FB: Erro ao verificar a assinatura:', error);
      res.status(500).json({ error: 'FB: Erro ao verificar a assinatura' });
    }
  });
  
  // Atualizar status da assinatura após pagamento
  app.post('/api/assinatura/atualizar', async (req, res) => {
    const { uid, assinaturaAtiva } = req.body;
    try {
      const userRef = db.collection('users').doc(uid);
      await userRef.update({ assinaturaAtiva });
      res.json({ message: 'FB: Assinatura atualizada com sucesso' });
    } catch (error) {
      console.error('FB: Erro ao atualizar a assinatura:', error);
      res.status(500).json({ error: 'FB: Erro ao atualizar a assinatura' });
    }
  });
  

app.listen(port, () => {
  console.log(`Servidor Firebase rodando na porta ${port}`);
});