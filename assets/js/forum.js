import { auth, db } from "./firebase.js";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

/* =========================
   🔐 PROTEÇÃO DE LOGIN
   ========================= */
onAuthStateChanged(auth, user => {
  if (!user) {
    window.location.href = "index.html";
  }
});

/* =========================
   📝 POSTAR
   ========================= */
const postarBtn = document.getElementById("postar");
const textoInput = document.getElementById("texto");

postarBtn.onclick = async () => {
  const texto = textoInput.value.trim();
  if (!texto) return alert("Escreve algo");

  await addDoc(collection(db, "posts"), {
    texto: texto,
    uid: auth.currentUser.uid,
    nome: auth.currentUser.displayName,
    foto: auth.currentUser.photoURL,
    criadoEm: Date.now(),
    likes: 0
  });

  textoInput.value = "";
};

/* =========================
   📡 FEED
   ========================= */
const feed = document.getElementById("posts");

const q = query(
  collection(db, "posts"),
  orderBy("criadoEm", "desc")
);

onSnapshot(q, snapshot => {
  feed.innerHTML = "";
  snapshot.forEach(doc => {
    const p = doc.data();
    feed.innerHTML += `
      <div class="post">
        <img src="${p.foto}" width="40">
        <strong>${p.nome}</strong>
        <p>${p.texto}</p>
        <small>❤️ ${p.likes}</small>
      </div>
    `;
  });
});

/* =========================
   🚪 SAIR
   ========================= */
document.getElementById("sair").onclick = async () => {
  await signOut(auth);
  window.location.href = "index.html";
};
