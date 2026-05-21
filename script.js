console.log("Hello, World! This is a simple JavaScript file.");

// Посилання на поля вводу (Inputs)
const nameInput = document.querySelector("#name");
const priceInput = document.querySelector("#price");
const qtyInput = document.querySelector("#qty");

// Посилання на кнопки (Buttons)
const addBtn = document.querySelector("#addBtn");

// Посилання на елементи керування та відображення
const searchInput = document.querySelector("#searchInput");
const productsContainer = document.querySelector("#productsList"); // Container — бо він містить список
// Початкові дані (8 годинників за замовчуванням)
const defaultProducts = [
  { id: 1, name: "Rolex Submariner", price: 12500, quantity: 2 },
  { id: 2, name: "Omega Speedmaster", price: 6800, quantity: 5 },
  { id: 3, name: "Casio G-Shock GA-2100", price: 120, quantity: 15 },
  { id: 4, name: "Tissot Le Locle", price: 650, quantity: 8 },
  { id: 5, name: "Seiko 5 Sports", price: 300, quantity: 12 },
  { id: 6, name: "Cartier Tank", price: 4200, quantity: 3 },
  { id: 7, name: "Patek Philippe Nautilus", price: 85000, quantity: 1 },
  { id: 8, name: "Apple Watch Series 9", price: 450, quantity: 10 },
];

// Наш масив даних (модель)
let products =
  JSON.parse(localStorage.getItem("myProducts")) || defaultProducts;

// Одразу малюємо те, що дістали з пам'яті
renderProducts();
updateTotalPrice();

addBtn.addEventListener("click", addProduct);

function addProduct() {
  const name = nameInput.value;
  const price = Number(priceInput.value);
  const quantity = Number(qtyInput.value);

  if (!name || !price || !quantity) {
    alert("Please fill in all fields with valid values.");
    return;
  }

  const product = {
    id: Date.now(),
    name: name,
    price: price,
    quantity: quantity,
  };
  products.push(product);
  console.log(products);
  renderProducts();
  clearInputs();
  updateTotalPrice();
  saveToLocalStorage();
}

function renderProducts(productsToRender = products) {
  productsContainer.innerHTML = "";

  productsToRender.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product-item"); // CSS знайде цей клас
    productElement.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price.toFixed(2)}</p>
            <p>Quantity: ${product.quantity}</p>
            <button onclick="deleteProduct(${product.id})">Remove 🗑️</button>
        `;
    productsContainer.appendChild(productElement);
  });
}

function deleteProduct(id) {
  products = products.filter((product) => product.id !== id);
  renderProducts();
  updateTotalPrice();
  saveToLocalStorage();
}

function updateTotalPrice() {
  const totalPrice = document.querySelector("#totalPrice");
  const total = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0,
  );
  totalPrice.textContent = `Total: $${total.toFixed(2)}`;
}

function clearInputs() {
  nameInput.value = "";
  priceInput.value = "";
  qtyInput.value = "";
}

searchInput.addEventListener("input", searchProducts);

function searchProducts() {
  const query = searchInput.value.toLowerCase();
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query),
  );
  renderProducts(filteredProducts);
}

function saveToLocalStorage() {
  localStorage.setItem("myProducts", JSON.stringify(products));
}
// console.log(nameAddProduct)
// console.log(priceAddProduct)
// console.log(quantityAddProduct)
// console.log(addProductButton)
// console.log(searchInput)
