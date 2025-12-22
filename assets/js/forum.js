import { auth, db } from "../../firebase.js";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const feed = document.getElementById("feed");
const postar = document.getElementById("postar");

onAuthStateChanged(auth, user => {
  if (!user) {
    window.location.href = "index.html";
  }
});

postar.onclick = async () => {
  const texto = document.getElementById("texto").value.trim();
  if (!texto) return;

  await addDoc(collection(db, "posts"), {
    texto,
    autor: auth.currentUser.displayName,
    criadoEm: serverTimestamp()
  });

  document.getElementById("texto").value = "";
};

const q = query(
  collection(db, "posts"),
  orderBy("criadoEm", "desc")
);

onSnapshot(q, snapshot => {
  feed.innerHTML = "";
  snapshot.forEach(doc => {
    const p = doc.data();
    feed.innerHTML += `
      <p><strong>${p.autor}</strong>: ${p.texto}</p>
      <hr>
    `;
  });
});
