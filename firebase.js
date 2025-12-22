import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

/* CONFIG FIREBASE — COPIA DO CONSOLE */
const firebaseConfig = {
  apiKey: "AIzaSyDSIKV7r2Pjf6kul0HvK4NpXHpt8xBAy_k",
  authDomain: "confessabj.firebaseapp.com",
  projectId: "confessabj",
  appId: "1:607149504816:web:1d4c0928159e1110d1b0f5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

/* LOGIN */
export function loginGoogle() {
  signInWithRedirect(auth, provider);
}

/* LOGOUT */
export function logoutGoogle() {
  return signOut(auth);
}

/* REDIRECT RESULT — ISSO É CRÍTICO */
getRedirectResult(auth).catch(() => {});

/* ESTADO DE LOGIN */
export function observarAuth(callback) {
  onAuthStateChanged(auth, callback);
}
