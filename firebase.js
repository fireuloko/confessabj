// firebase.js
// CONFIGURAÇÃO ÚNICA DO FIREBASE – NÃO DUPLICAR EM OUTRO ARQUIVO

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

/* ===============================
   🔥 CONFIG DO SEU PROJETO
   =============================== */

export const firebaseConfig = {
  apiKey: "AIzaSyDSIKV7r2Pjf6kul0HvK4NpXHpt8xBAy_k",
  authDomain: "confessabj.firebaseapp.com",
  projectId: "confessabj",
  storageBucket: "confessabj.firebasestorage.app",
  messagingSenderId: "607149504816",
  appId: "1:607149504816:web:1d4c0928159e1110d1b0f5"
};

/* ===============================
   🚀 INICIALIZAÇÃO
   =============================== */

export const app = initializeApp(firebaseConfig);

/* ===============================
   🔐 AUTH (LOGIN GOOGLE)
   =============================== */

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

/* ===============================
   📦 BANCO DE DADOS
   =============================== */

export const db = getFirestore(app);

/* ===============================
   🖼️ STORAGE (FOTOS)
   =============================== */

export const storage = getStorage(app);
