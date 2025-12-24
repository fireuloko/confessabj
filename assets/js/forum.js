kimport { auth, db } from "../../firebase.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const feed = document.getElementById("feed");
const btnPostar = document.getElementById("btnPostar");
const texto = document.getElementById("texto");

onAuthStateChanged(auth, user => {
  if (!user) {
    window.location.replace("index.html");
  }
});

// postar
btnPostar.onclick = async () => {
  if (!texto.value.trim()) return;

  await addDoc(collection(db, "posts"), {
    texto: texto.value,
    autor: auth.currentUser.displayName,
    foto: auth.currentUser.photoURL,
    uid: auth.currentUser.uid,
    criadoEm: serverTimestamp(),
    likes: 0
  });

  texto.value = "";
};

// feed
const q = query(collection(db, "posts"), orderBy("criadoEm", "desc"));
onSnapshot(q, snapshot => {
  feed.innerHTML = "";
  snapshot.forEach(doc => {
    const p = doc.data();
    feed.innerHTML += `
      <div class="post">
        <img src="${p.foto}">
        <strong>${p.autor}</strong>
        <p>${p.texto}</p>
      </div>
    `;
  });
});
