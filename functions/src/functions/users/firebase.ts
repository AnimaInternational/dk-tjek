import firebase from "firebase-admin";

const {
  FIREBASE_PROJECT_ID,
  FIREBASE_PRIVATE_KEY_ID,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_CLIENT_ID,
  FIREBASE_CLIENT_X509_CERT_URL,
  FIREBASE_DATABASE_URL,
} = process.env;

const privateKey =
  FIREBASE_PRIVATE_KEY![0] === "-"
    ? FIREBASE_PRIVATE_KEY
    : JSON.parse(FIREBASE_PRIVATE_KEY!);

console.log("private key: ", privateKey.slice(0, 10));

firebase.initializeApp({
  credential: firebase.credential.cert({
    type: "service_account",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    project_id: FIREBASE_PROJECT_ID,
    private_key_id: FIREBASE_PRIVATE_KEY_ID,
    private_key: privateKey,
    client_email: FIREBASE_CLIENT_EMAIL,
    client_id: FIREBASE_CLIENT_ID,
    client_x509_cert_url: FIREBASE_CLIENT_X509_CERT_URL,
  } as any),
  databaseURL: FIREBASE_DATABASE_URL,
});

export const firebaseAuth = firebase.auth();
