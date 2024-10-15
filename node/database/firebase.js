const admin = require('firebase-admin');
// const serviceAccount = require('../Key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://centro-deportivo-fbd23-default-rtdb.firebaseio.com/" // Cambia por tu URL de Firebase
});

const db = admin.firestore(); // Para Firestore
module.exports = { db };
