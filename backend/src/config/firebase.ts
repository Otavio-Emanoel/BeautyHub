import admin from 'firebase-admin';

if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}
// Verifica se a permissão de listar usuários está funcionando

// admin.auth().listUsers(1)
//   .then(() => console.log('Permissão OK para listar usuários'))
//   .catch((err) => console.error('Erro de permissão:', err));

// admin.auth().createCustomToken('UID_DO_USUARIO')
//   .then(token => console.log(token));

const auth = admin.auth();
const firestore = admin.firestore();

export { auth, firestore };
export default admin;