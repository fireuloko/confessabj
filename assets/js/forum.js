import { auth, db } from "./firebase.js";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const postsDiv = document.getElementById("posts");
const postarBtn = document.getElementById("postar");
const texto = document.getElementById("texto");
const sairBtn = document.getElementById("sair");

// SAIR
sairBtn.onclick = () => auth.signOut();

// POSTAR
postarBtn.onclick = async () => {
  if (!auth.currentUser) return alert("Não autenticado");
  if (!texto.value.trim()) return;

  await addDoc(collection(db, "posts"), {
    texto: texto.value,
    uid: auth.currentUser.uid,
    nome: auth.currentUser.displayName || "Anônimo",
    foto: auth.currentUser.photoURL || "",
    likes: 0,
    likedBy: [],
    createdAt: serverTimestamp()
  });

  texto.value = "";
};

// LISTAR POSTS
const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));

onSnapshot(q, snapshot => {
  postsDiv.innerHTML = "";

  snapshot.forEach(docSnap => {
    const post = docSnap.data();
    const id = docSnap.id;
    const user = auth.currentUser;
    const jaCurtiu = user && post.likedBy.includes(user.uid);

    const div = document.createElement("div");
    div.className = "post";

    div.innerHTML = `
      <div class="post-header">
        <img src="${post.foto || 'https://i.imgur.com/8Km9tLL.png'}">
        <strong>${post.nome}</strong>
      </div>
      <p>${post.texto}</p>
      <small>${post.likes} curtidas</small><br>
      <button data-id="${id}">
        ${jaCurtiu ? "💔 Descurtir" : "❤️ Curtir"}
      </button>
    `;

    const btn = div.querySelector("button");
    btn.onclick = async () => {
      const ref = doc(db, "posts", id);

      if (!user) return;

      if (jaCurtiu) {
        await updateDoc(ref, {
          likes: post.likes - 1,
          likedBy: arrayRemove(user.uid)
        });
      } else {
        await updateDoc(ref, {
          likes: post.likes + 1,
          likedBy: arrayUnion(user.uid)
        });
      }
    };

    postsDiv.appendChild(div);
  });
});
