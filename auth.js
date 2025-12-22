import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// 🔥 CONFIG FIREBASE (SEUS DADOS AQUI)
const firebaseConfig = {
  apiKey: "AIzaSyDSIKV7r2Pjf6kul0HvK4NpXHpt8xBAy_k",
  authDomain: "confessabj.firebaseapp.com",
  projectId: "confessabj",
  appId: "1:607149504816:web:1d4c0928159e1110d1b0f5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// LOGIN
const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
  loginBtn.onclick = () => {
    signInWithRedirect(auth, provider);
  };
}

// RESULTADO DO REDIRECT
getRedirectResult(auth).catch(() => {});

// PROTEÇÃO + REDIRECIONAMENTO
onAuthStateChanged(auth, (user) => {
  const path = window.location.pathname;

  const isForum = path.endsWith("forum.html");
  const isHome = path.endsWith("/") || path.endsWith("index.html");

  if (user && isHome) {
    window.location.href = "forum.html";
  }

  if (!user && isForum) {
    window.location.href = "index.html";
  }

  if (user) {
    const el = document.getElementById("user");
    if (el) el.innerText = "Logado como: " + user.displayName;
  }
});
// LOGOUT
const logoutBtn = document.getElementById("logout");
if (logoutBtn) {
  logoutBtn.onclick = () => signOut(auth);
}
