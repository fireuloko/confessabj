import { auth, db } from "../../firebase.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ELEMENTOS
const feed = document.getElementById("feed");
const postarBtn = document.getElementById("postar");
const textoEl = document.getElementById("texto");
const logoutBtn = document.getElementById("logout");

let usuario = null;

// 🔐 VERIFICA LOGIN
onAuthStateChanged(auth, user => {
  if (!user) {
    window.location.href = "index.html";
  } else {
    usuario = user;
  }
});

// 🚪 LOGOUT
logoutBtn.onclick = async () => {
  await signOut(auth);
  window.location.href = "index.html";
};

// ✍️ POSTAR
postarBtn.onclick = async () => {
  if (!usuario) return;

  const texto = textoEl.value.trim();
  if (!texto) return;

  await addDoc(collection(db, "posts"), {
    texto: texto,
    autor: usuario.displayName,
    foto: usuario.photoURL,
    criadoEm: serverTimestamp()
  });

  textoEl.value = "";
};

// 📥 FEED
const q = query(
  collection(db, "posts"),
  orderBy("criadoEm", "desc")
);

onSnapshot(q, snapshot => {
  feed.innerHTML = "";
  snapshot.forEach(doc => {
    const p = doc.data();
    feed.innerHTML += `
feed.innerHTML += `
  <div class="post">
    <div class="post-header">
      <img src="${p.foto}">
      <strong>${p.autor}</strong>
    </div>
    <p>${p.texto}</p>
  </div>
`;
  });
});
