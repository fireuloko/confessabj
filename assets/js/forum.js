import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDSIKV7r2Pjf6kul0HvK4NpXHpt8xBAy_k",
  authDomain: "confessabj.firebaseapp.com",
  projectId: "confessabj",
  storageBucket: "confessabj.firebasestorage.app",
  messagingSenderId: "607149504816",
  appId: "1:607149504816:web:1d4c0928159e1110d1b0f5"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const text = document.getElementById("confessionText");
const btn = document.getElementById("postBtn");
const feed = document.getElementById("feed");

let currentUser = null;

onAuthStateChanged(auth, user => {
  if (!user) {
    window.location.href = "index.html";
  } else {
    currentUser = user;
    loadFeed();
  }
});

btn.onclick = async () => {
  if (!text.value.trim()) return;

  await addDoc(collection(db, "confessions"), {
    text: text.value,
    authorId: currentUser.uid,
    nickname: currentUser.displayName,
    photo: currentUser.photoURL,
    createdAt: serverTimestamp()
  });

  text.value = "";
};

function loadFeed() {
  const q = query(
    collection(db, "confessions"),
    orderBy("createdAt", "desc")
  );

  onSnapshot(q, snap => {
    feed.innerHTML = "";
    snap.forEach(doc => {
      const d = doc.data();

      feed.innerHTML += `
        <div class="post">
          <div class="post-header">
            <img src="${d.photo}">
            <strong>${d.nickname}</strong>
          </div>
          <div class="post-text">${d.text}</div>
        </div>
      `;
    });
  });
}
