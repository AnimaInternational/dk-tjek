import firebase from "firebase-admin";

firebase.initializeApp({
  credential: firebase.credential.cert({
    type: "service_account",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: JSON.parse(process.env.FIREBASE_PRIVATE_KEY!),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  } as any),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

export const firebaseAuth = firebase.auth();
