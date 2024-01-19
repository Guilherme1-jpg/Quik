const crypto = require('crypto');
const { writeFileSync } = require('fs');

// Geração de Chaves
const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: { type: 'spki', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
});

// Armazenamento
writeFileSync('private_key.pem', privateKey);
writeFileSync('public_key.pem', publicKey);

console.log('Chaves geradas com sucesso.');
