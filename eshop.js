const products = [
  { id: 1, name: "Product A", price: 20, image: "https://via.placeholder.com/200" },
  { id: 2, name: "Product B", price: 35, image: "https://via.placeholder.com/200" },
  { id: 3, name: "Product C", price: 50, image: "https://via.placeholder.com/200" },
];

const cart = {};
const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const totalDisplay = document.getElementById("total");
const cartCount = document.getElementById("cart-count");

function renderProducts() {
  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
}

function addToCart(productId) {
  cart[productId] = (cart[productId] || 0) + 1;
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;
  let count = 0;

  for (let id in cart) {
    const product = products.find(p => p.id == id);
    const quantity = cart[id];
    total += product.price * quantity;
    count += quantity;

    const item = document.createElement("div");
    item.className = "cart-item";
    item.innerHTML = `
      <span>${product.name} x${quantity}</span>
      <button onclick="removeFromCart(${id})">❌</button>
    `;
    cartItems.appendChild(item);
  }

  cartCount.innerText = count;
  totalDisplay.innerText = total.toFixed(2);
}

function removeFromCart(productId) {
  delete cart[productId];
  updateCart();
}

function toggleCart() {
  const cartEl = document.getElementById("cart");
  cartEl.style.display = cartEl.style.display === "block" ? "none" : "block";
}

document.getElementById("checkout-form").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Order placed successfully!");
  for (let id in cart) delete cart[id];
  updateCart();
  toggleCart();
});

renderProducts();
