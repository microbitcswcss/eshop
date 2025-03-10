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

// 設定 Firebase Auth 的持久化為 SESSION
auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(() => {
    // SESSION 持久化成功，若有現存的登入狀態會自動保持
  })
  .catch((error) => {
    console.error("Persistence error:", error);
  });

// 監聽用戶登入狀態
auth.onAuthStateChanged(user => {
  const loginBtn = document.getElementById("login-btn");
  const logoutBtn = document.getElementById("logout-btn");
  
  if (user) {
    if (loginBtn) loginBtn.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "inline";
    // 若在結帳頁面，讀取用戶積分
    if (document.getElementById("user-credits")) {
      fetchUserCredits(user.uid);
    }
  } else {
    if (loginBtn) loginBtn.style.display = "inline";
    if (logoutBtn) logoutBtn.style.display = "none";
    const creditsEl = document.getElementById("user-credits");
    if (creditsEl) {
      creditsEl.textContent = "請登入";
    }
  }
});

// 登入：使用者點擊登入按鈕後，使用 Google Provider 登入
if (document.getElementById("login-btn")) {
  document.getElementById("login-btn").addEventListener("click", () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
      .catch(error => console.error("登入錯誤:", error));
  });
}

// 登出
if (document.getElementById("logout-btn")) {
  document.getElementById("logout-btn").addEventListener("click", () => {
    auth.signOut().catch(error => console.error("登出錯誤:", error));
  });
}

// 從 Firestore 取得用戶剩餘積分，若無資料則初始化為 1000
function fetchUserCredits(uid) {
  db.collection("users").doc(uid).get().then(doc => {
    if (doc.exists) {
      updateCreditsDisplay(doc.data().credits);
    } else {
      db.collection("users").doc(uid).set({ credits: 1000 })
        .then(() => updateCreditsDisplay(1000));
    }
  }).catch(err => console.error("取得用戶積分錯誤:", err));
}

function updateCreditsDisplay(credits) {
  const creditsEl = document.getElementById("user-credits");
  if (creditsEl) creditsEl.textContent = credits;
}

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
