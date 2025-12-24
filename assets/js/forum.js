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

window.postar = async function() {
  const texto = document.getElementById("texto").value;

  if (!texto.trim()) {
    alert("Digite algo");
    return;
  }

  await addDoc(collection(db, "posts"), {
    autor: auth.currentUser.displayName,
    foto: auth.currentUser.photoURL,
    texto: texto,
    likes: 0,
    criadoEm: Date.now()
  });

  document.getElementById("texto").value = "";
};
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

    <div class="post-actions">
      <button class="like-btn" onclick="curtir('${doc.id}')">
        ❤️ <span>${p.likes || 0}</span>
      </button>
    </div>
  </div>
`;
import { doc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

window.curtir = async function(id) {
  const ref = doc(db, "posts", id);
  await updateDoc(ref, {
    likes: increment(1)
  });
};
