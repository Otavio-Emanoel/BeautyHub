import { Request, Response } from 'express';
import admin from '../config/firebase';

export async function loginWithGoogle(req: Request, res: Response) {
  const { idToken } = req.body;
  if (!idToken) {
    return res.status(400).json({ error: 'Token do Google não fornecido.' });
  }
  try {

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email, name, picture } = decodedToken;


    const userDoc = await admin.firestore().collection('users').doc(uid).get();
    if (!userDoc.exists) {

      await admin.firestore().collection('users').doc(uid).set({
        email,
        name,
        photo: picture,
        role: 'client', 
        createdAt: new Date().toISOString()
      });
    }

    // Retorna o token e dados do usuário
    res.status(200).json({ token: idToken, user: { uid, email, name, picture } });
  } catch (error: any) {
    res.status(401).json({ error: 'Token inválido', details: error.message });
  }
}
