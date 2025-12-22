import { auth } from "../../firebase.js";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const db = getFirestore();

// ELEMENTOS
const feed = document.getElementById("feed");
const postarBtn = document.getElementById("postar");

// POSTAR CONFISSÃO
postarBtn.onclick = async () => {
  const texto = document.getElementById("texto").value.trim();
  if (!texto) return;

  await addDoc(collection(db, "posts"), {
    uid: auth.currentUser.uid,
    apelido: auth.currentUser.displayName,
    texto: texto,
    likes: 0,
    createdAt: serverTimestamp()
  });

  document.getElementById("texto").value = "";
};

// CARREGAR FEED
const q = query(
  collection(db, "posts"),
  orderBy("createdAt", "desc")
);

onSnapshot(q, snapshot => {
  feed.innerHTML = "";

  snapshot.forEach(doc => {
    const post = doc.data();

    feed.innerHTML += `
      <div class="post">
        <strong>${post.apelido}</strong>
        <p>${post.texto}</p>
        <small>❤️ ${post.likes}</small>
      </div>
      <hr>
    `;
  });
});
