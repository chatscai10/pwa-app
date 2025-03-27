if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js').then(reg => {
    console.log('Service Worker 註冊成功');

    // 監聽是否有新的 SW 安裝好
    reg.addEventListener('updatefound', () => {
      const newWorker = reg.installing;
      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed') {
          if (navigator.serviceWorker.controller) {
            // 有新版本，提示使用者重新整理
            showUpdateToast();
          }
        }
      });
    });
  });
}

function showUpdateToast() {
  const toast = document.createElement('div');
  toast.textContent = '有新版本可用，請重新整理頁面';
  toast.style.position = 'fixed';
  toast.style.bottom = '20px';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.style.background = '#333';
  toast.style.color = '#fff';
  toast.style.padding = '10px 20px';
  toast.style.borderRadius = '10px';
  toast.style.zIndex = 1000;
  toast.style.cursor = 'pointer';

  toast.onclick = () => {
    window.location.reload();
  };

  document.body.appendChild(toast);
}


document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const id = document.getElementById("id").value;

  const res = await fetch("https://script.google.com/macros/s/AKfycbwTxCtSN4EyTprkzaOIjilrkULyr0lTyc9ro6-C0PFfZyukKHV2IRB8CouxtyqYFWwt/exec", {
    method: "POST",
    body: JSON.stringify({
      action: "login",
      name,
      id
    }),
    headers: { "Content-Type": "application/json" }
  });

  const result = await res.json();
  if (result.success) {
    localStorage.setItem("user", JSON.stringify(result.data)); // 儲存登入者
    window.location.href = "home.html"; // 登入成功後導向首頁
  } else {
    alert("登入失敗：" + result.message);
  }
});
