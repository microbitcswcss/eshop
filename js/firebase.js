// Firebase 設定（請替換成您的設定值）
  const firebaseConfig = {
    apiKey: "AIzaSyAsMctDnKixkCFeFsFDdIXI6BLwcgs5_rY",
    authDomain: "eshop-gh.firebaseapp.com",
    projectId: "eshop-gh",
    storageBucket: "eshop-gh.firebasestorage.app",
    messagingSenderId: "47936036656",
    appId: "1:47936036656:web:41e06cf376964e282a32f5",
    measurementId: "G-NCGSC5QN14"
  };

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// 監聽用戶登入狀態
auth.onAuthStateChanged(user => {
  if (user) {
    document.getElementById("login-btn").style.display = "none";
    document.getElementById("logout-btn").style.display = "inline";
    // 讀取用戶積分
    fetchUserCredits(user.uid);
  } else {
    document.getElementById("login-btn").style.display = "inline";
    document.getElementById("logout-btn").style.display = "none";
    const creditsEl = document.getElementById("user-credits");
    if (creditsEl) {
      creditsEl.textContent = "請登入";
    }
  }
});

// 登入（以 Google 登入為例）
document.getElementById("login-btn").addEventListener("click", () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
});

// 登出
document.getElementById("logout-btn").addEventListener("click", () => {
  auth.signOut();
});

// 從 Firestore 取得用戶積分
function fetchUserCredits(uid) {
  const userDoc = db.collection("users").doc(uid);
  userDoc.get().then(doc => {
    if (doc.exists) {
      updateCreditsDisplay(doc.data().credits);
    } else {
      // 若無用戶資料則建立預設積分（例如 1000）
      userDoc.set({ credits: 1000 }).then(() => {
        updateCreditsDisplay(1000);
      });
    }
  }).catch(err => {
    console.error("取得用戶積分錯誤：", err);
  });
}

function updateCreditsDisplay(credits) {
  const creditsEl = document.getElementById("user-credits");
  if (creditsEl) {
    creditsEl.textContent = credits;
  }
}
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
