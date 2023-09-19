const admin = require('firebase-admin');

const serviceAccount = require('./auth-test-skapple-firebase-adminsdk-rogb1-ef82d69794');

class Firebase {

  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      apiKey: "AIzaSyAx7REQWsAL9nH3lTnzr1e14Qcpuh1RS1o",
      authDomain: "auth-test-skapple.firebaseapp.com",
      projectId: "auth-test-skapple",
      storageBucket: "auth-test-skapple.appspot.com",
      messagingSenderId: "975481134247",
      appId: "1:975481134247:web:fc50067eb6a57bf92b8f82"
    });
  }

  async validateFirebaseToken(req, res, next) {
    const token = req.headers.authorization?.split('Bearer ')[1];
  
    if (!token) {
      return res.status(401).json({ error: 'No se proporcionó el token de Firebase' });
    }
  
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      req.user = decodedToken;
      next();
    } catch (error) {
      return res.status(403).json({ error: 'Token inválido o expirado' });
    }
  };
}

module.exports = Firebase;
