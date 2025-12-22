import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

/* 🔥 CONFIG DO FIREBASE (EXATA DO CONSOLE) */
const firebaseConfig = {
  apiKey: "AIzaSyDSIKV7r2Pjf6kul0HvK4NpXHpt8xBAy_k",
  authDomain: "confessabj.firebaseapp.com",
  projectId: "confessabj",
  appId: "1:607149504816:web:1d4c0928159e1110d1b0f5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

/* LOGIN POPUP */
export function loginGoogle() {
  return signInWithPopup(auth, provider);
}

/* LOGOUT */
export function logoutGoogle() {
  return signOut(auth);
}

/* OBSERVADOR */
export function observarAuth(cb) {
  onAuthStateChanged(auth, cb);
}
