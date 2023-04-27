const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

let secretKey = 'ma_cle_secrete';
console.log('toto');
const payload = { 
  id: 123, 
  firstName: 'Alice',
  lastName: 'Doe',
  email: 'alice.doe@example.com'
};


const token = jwt.sign(payload, secretKey);

console.log(token);

app.use((req, res, next) => {

  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, secretKey, (err, decodedToken) => { // 'secret_key' est la clé secrète utilisée pour signer le jeton JWT
      if (err) {
        return res.status(401).json({ message: 'Token invalide' });
      } else {
        req.firstName = decodedToken.firstName; // extrait le prénom de l'utilisateur et le stocke dans la requête
        console.log(req.firstName);
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'Aucun token fourni' });
  }
});

app.get('/:firstName/profile', (req, res) => {
  const firstName = req.params.firstName;
  res.send(`Bienvenue sur votre profil, ${firstName} !`);
});

app.listen(3000, () => console.log('Serveur démarré sur le port 3000'));