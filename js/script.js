document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    updateCartPreview();
});

// 讀取商品 JSON 並顯示
function loadProducts() {
    fetch("js/products.json")
        .then(response => response.json())
        .then(products => {
            let productContainer = document.getElementById("product-list");
            productContainer.innerHTML = "";

            products.forEach(product => {
                let productElement = document.createElement("div");
                productElement.classList.add("product");
                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h2>${product.name}</h2>
                    <p>價格: $${product.price}</p>
                    <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">加入購物車</button>
                `;
                productContainer.appendChild(productElement);
            });
        });
}

// 加入購物車 (存入 Cookies)
function addToCart(id, name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ id, name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartPreview();
}

// 更新購物車預覽
function updateCartPreview() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = "";

    cart.forEach((item, index) => {
        let li = document.createElement("li");
        li.textContent = `${item.name} - ￥${item.price}`;
        cartItemsContainer.appendChild(li);
    });
}

// 清空購物車（雙重確認）
document.getElementById("clear-cart").addEventListener("click", () => {
    if (confirm("確定要清空購物車嗎？")) {
        localStorage.removeItem("cart");
        updateCartPreview();
    }
});

// 結帳按鈕跳轉
document.getElementById("checkout").addEventListener("click", () => {
    window.location.href = "/checkout/index.html";
});
