import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

/* 🔥 CONFIG FIREBASE */
const firebaseConfig = {
  apiKey: "AIzaSyDSIKV7r2Pjf6kul0HvK4NpXHpt8xBAy_k",
  authDomain: "confessabj.firebaseapp.com",
  projectId: "confessabj",
  appId: "1:607149504816:web:1d4c0928159e1110d1b0f5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

/* 👉 LOGIN */
const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    sessionStorage.setItem("loginTentativa", "1");
    signInWithRedirect(auth, provider);
  });
}

/* 👉 RESULTADO DO LOGIN */
getRedirectResult(auth)
  .then((result) => {
    if (result && result.user) {
      sessionStorage.setItem("logado", "1");
      window.location.href = "forum.html";
    }
  })
  .catch(() => {});

/* 👉 PROTEÇÃO DE PÁGINA */
onAuthStateChanged(auth, (user) => {
  const path = window.location.pathname;

  if (user) {
    sessionStorage.setItem("logado", "1");
  }

  if (!user && path.endsWith("forum.html")) {
    window.location.href = "index.html";
  }

  if (user && path.endsWith("forum.html")) {
    const el = document.getElementById("user");
    if (el) el.innerText = "Logado como: " + user.displayName;
  }
});

/* 👉 LOGOUT */
const logoutBtn = document.getElementById("logout");
if (logoutBtn) {
  logoutBtn.onclick = () => {
    sessionStorage.clear();
    signOut(auth).then(() => {
      window.location.href = "index.html";
    });
  };
}
