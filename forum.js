import { 
  getFirestore, 
  collection, 
  addDoc, 
  onSnapshot, 
  doc, 
  updateDoc, 
  increment 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";import { auth, db } from "./firebase.js";

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
   🔐 VERIFICA LOGIN
   ========================= */
onAuthStateChanged(auth, user => {
  if (!user) {
    window.location.href = "index.html";
  }
});

/* =========================
   📝 POSTAR
   ========================= */
const btnPostar = document.getElementById("postar");
const campoTexto = document.getElementById("texto");

btnPostar.onclick = async () => {
  const texto = campoTexto.value.trim();

  if (!texto) {
    alert("Escreve algo primeiro");
    return;
  }

  try {
    await addDoc(collection(db, "posts"), {
      texto: texto,
      uid: auth.currentUser.uid,
      nome: auth.currentUser.displayName,
      foto: auth.currentUser.photoURL,
      criadoEm: Date.now(),
      likes: 0
    });

    campoTexto.value = "";
  } catch (e) {
    alert("Erro ao postar: " + e.message);
  }
};

/* =========================
   📡 FEED
   ========================= */
const areaPosts = document.getElementById("posts");

const q = query(
  collection(db, "posts"),
  orderBy("criadoEm", "desc")
);

onSnapshot(q, snapshot => {
  areaPosts.innerHTML = "";

  snapshot.forEach(doc => {
    const p = doc.data();

div.innerHTML = `
  <div class="post">
    <p>${post.text}</p>

    <button class="like-btn" data-id="${id}" type="button">
      ❤️ <span>${post.likes ?? 0}</span>
    </button>
  </div>
    `;
const likeBtn = div.querySelector(".like-btn");

likeBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const postId = likeBtn.dataset.id;
  console.log("Curtindo post:", postId);

  try {
    const ref = doc(db, "posts", postId);
    await updateDoc(ref, {
      likes: increment(1)
    });
    console.log("Like enviado com sucesso");
  } catch (err) {
    console.error("Erro ao curtir:", err);
  }
});
/* =========================
   🚪 SAIR
   ========================= */
document.getElementById("sair").onclick = async () => {
  await signOut(auth);
  window.location.href = "index.html";
};
