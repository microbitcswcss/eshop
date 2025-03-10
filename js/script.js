document.addEventListener("DOMContentLoaded", () => {
  // 若首頁存在商品列表則載入產品
  if (document.getElementById("product-list")) {
    loadProducts();
  }
  // 若結帳頁面存在購物車列表則顯示購物車明細
  if (document.getElementById("checkout-cart-items")) {
    displayCheckoutCart();
  }
});

 // 如果在結帳頁面 (檢查 checkout-cart-items 存在) 就顯示購物車明細
  const checkoutCartItems = document.getElementById("checkout-cart-items");
  if (checkoutCartItems) {
    displayCheckoutCart();
    const confirmPurchaseBtn = document.getElementById("confirm-purchase");
    if (confirmPurchaseBtn) {
      confirmPurchaseBtn.addEventListener("click", confirmPurchase);
    }
  }
});

// 從 products.json 載入產品資料並動態顯示
function loadProducts() {
  fetch("/js/products.json")
    .then(response => response.json())
    .then(products => {
      const productContainer = document.getElementById("product-list");
      productContainer.innerHTML = "";
      products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");
        productElement.innerHTML = `
          <img src="/assets/productsimg/${product.image}" alt="${product.name}" height="75%" width="75%">
          <h2>${product.name}</h2>
          <p>價格: $${product.price}</p>
          <p>${product.details}</p>
          <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">加入購物車</button>
        `;
        productContainer.appendChild(productElement);
      });
    });
}

// 加入商品至購物車 (以 localStorage 模擬購物車)
function addToCart(id, name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ id, name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("已加入購物車");
}

// 在結帳頁面顯示購物車內容與計算總價
function displayCheckoutCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartList = document.getElementById("checkout-cart-items");
  cartList.innerHTML = "";
  let totalPrice = 0;
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
    totalPrice += item.price;
  });
  document.getElementById("total-price").textContent = totalPrice;
}

// 確認購買（購買成功後清除購物車，並導回首頁）
document.getElementById("confirm-purchase").addEventListener("click", () => {
  alert("購買成功！");
  localStorage.removeItem("cart");
  window.location.href = "/";
});
