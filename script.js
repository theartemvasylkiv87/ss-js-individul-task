// js/script.js
console.log("🚀 WatchVault Engine Powered Up!");

/* ==========================================================================
   1. STATE (СТАН ДОДАТКУ - ДАНІ ТА LOCALSTORAGE)
   ========================================================================== */

const defaultProducts = [
  { id: 1, name: "Rolex Submariner", price: 12500, quantity: 2, image: "https://media.rolex.com/image/upload/q_auto/f_auto/c_limit,w_1920/v1775305300/rolexcom/094398bf1f99/navigation/professional-watches-submariner-navigation-portrait" },
  { id: 2, name: "Omega Speedmaster", price: 6800, quantity: 5, image: "https://www.omegawatches.com/media/catalog/product/o/m/omega-speedmaster-moonwatch-professional-co-axial-master-chronometer-chronograph-42-mm-31030425004001-5bcb6e.png?w=1100" },
  { id: 3, name: "Casio G-Shock GA-2100", price: 120, quantity: 15, image: "https://www.casio.com/content/dam/casio/product-info/locales/de/de/timepiece/product/watch/G/GA/GA2/ga-2100bm-7a2/assets/GA-2100BM-7A2.png.transform/main-visual-pc/image.png" },
  { id: 4, name: "Tissot Le Locle", price: 650, quantity: 8, image: "https://www.tissotwatches.com/dw/image/v2/BKKD_PRD/on/demandware.static/-/Sites-Tissot-Catalogue/default/dwf7ea6df5/product-pictures/45f68220-5164-45bd-862a-20d5f845f9ab_T006-407-16-033-01_shadow.png?sm=fit&sw=1680&sh=1680,gravity=center" },
  { id: 5, name: "Seiko 5 Sports", price: 300, quantity: 12, image: "https://owp.klarna.com/product/640x640/3021705635/Seiko-5-Sports-(SRPJ83K1).jpg?ph=true" },
  { id: 6, name: "Cartier Tank", price: 4200, quantity: 3, image: "https://www.weber-juwelier.de/cdn/2000x2000/e/7/5/2/e752624340260efab42f48e151b959edda07a2fb_WSTA0041_01_PROD_1058_Cartier_2000x2000_33_7x25_5mm.jpg" },
  { id: 7, name: "Patek Philippe Nautilus", price: 85000, quantity: 1, image: "https://www.uhren2000.de/cdn/shop/files/3900-001-G11.jpg?v=1732704593" },
  { id: 8, name: "Apple Watch Series 9", price: 450, quantity: 10, image: "https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/apple-watch-series-9.png" }
];

let products = JSON.parse(localStorage.getItem("myProducts")) || defaultProducts;
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];

// Хелпери збереження даних
const saveProductsState = () => localStorage.setItem("myProducts", JSON.stringify(products));
const saveCartState = () => localStorage.setItem("cart", JSON.stringify(cart));
const saveOrdersState = () => localStorage.setItem("orders", JSON.stringify(orders));

/* ==========================================================================
   2. UI RENDERING (ВІДОБРАЖЕННЯ HTML)
   ========================================================================== */

// Малювання карток товарів на вітрині
function renderProducts(productsToRender = products) {
  const container = document.querySelector("#productsList");
  if (!container) return;

  container.innerHTML = "";

  if (productsToRender.length === 0) {
    container.innerHTML = `<p class="no-results">No watches found matching your search... 🔍</p>`;
    return;
  }

  productsToRender.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product-item");
    productElement.innerHTML = `
      <h3>${product.name}</h3>
      <img src="${product.image}" alt="${product.name}" class="product-img" />
      <p>Price: $${product.price.toFixed(2)}</p>
      <p>In Stock: ${product.quantity}</p>
      <div class="product-item__actions">
        <button class="add-to-cart-btn" data-action="add-to-cart" data-id="${product.id}">Add to Cart 🛒</button>
        <button class="delete-btn" data-action="delete-product" data-id="${product.id}">Remove 🗑️</button>
      </div>
    `;
    container.appendChild(productElement);
  });
}

// Малювання товарів у кошику
function renderCart() {
  const container = document.querySelector("#cartItems");
  const badge = document.querySelector(".cart-count");
  const totalEl = document.querySelector("#cartTotalPrice");
  if (!container || !badge || !totalEl) return;

  badge.textContent = cart.length;
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = `<p class="cart-drawer__empty">Your cart is empty.</p>`;
    totalEl.textContent = `$0.00`;
    return;
  }

  let cartTotal = 0;
  cart.forEach((item, index) => {
    cartTotal += item.price;

    const cartItemEl = document.createElement("div");
    cartItemEl.classList.add("cart-item");
    cartItemEl.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item__img">
      <div class="cart-item__info">
        <h4 class="cart-item__name">${item.name}</h4>
        <p class="cart-item__price">$${item.price.toFixed(2)}</p>
      </div>
      <button class="cart-item__remove" data-action="remove-from-cart" data-index="${index}">✖️</button>
    `;
    container.appendChild(cartItemEl);
  });

  totalEl.textContent = `$${cartTotal.toFixed(2)}`;
}

// Малювання історії замовлень
function renderOrders() {
  const container = document.querySelector("#ordersList");
  if (!container) return;

  container.innerHTML = "";

  if (orders.length === 0) {
    container.innerHTML = `<p class="orders-empty">У вас ще немає замовлень. 📋</p>`;
    return;
  }

  orders.slice().reverse().forEach((order) => {
    const orderEl = document.createElement("div");
    orderEl.classList.add("order-item");
    orderEl.innerHTML = `
      <div class="order-item__header">
        <strong class="order-item__id">ID: ${order.id}</strong>
        <span class="order-item__date">${order.date}</span>
      </div>
      <div class="order-item__content">
        ${order.items.map(item => `
          <div class="order-item__product">
            <span class="order-item__product-name">${item.name}</span>
            <span class="order-item__product-price">$${item.price.toFixed(2)}</span>
          </div>
        `).join("")}
      </div>
      <div class="order-item__footer">Total: $${order.total.toFixed(2)}</div>
    `;
    container.appendChild(orderEl);
  });
}

// Оновлення загальної вартості всього складу годинників
function updateStoreTotal() {
  const totalEl = document.querySelector("#totalPrice");
  if (!totalEl) return;
  const total = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
  totalEl.textContent = `Total Value: $${total.toFixed(2)}`;
}

/* ==========================================================================
   3. BUSINESS LOGIC (БІЗНЕС-ЛОГІКА ДОДАТКУ)
   ========================================================================== */

// Додавання нового годинника через форму складу
function handleAddProduct() {
  const name = document.querySelector("#name")?.value;
  const price = Number(document.querySelector("#price")?.value);
  const quantity = Number(document.querySelector("#qty")?.value);
  const image = document.querySelector("#image")?.value;

  if (!name || !price || !quantity) {
    alert("Please fill in all fields with valid values.");
    return;
  }

  products.push({
    id: Date.now(),
    name,
    price,
    quantity,
    image: image || "https://example.com/default-watch.jpg",
  });

  saveProductsState();
  renderProducts();
  updateStoreTotal();
  
  // Очищення полів форми
  ["#name", "#price", "#qty", "#image"].forEach(id => {
    const el = document.querySelector(id);
    if (el) el.value = "";
  });
}

// Пошук та сортування товарів на вітрині
function handleSearchAndSort() {
  const query = document.querySelector("#searchInput")?.value.toLowerCase() || "";
  const sortType = document.querySelector("#sortSelect")?.value || "";

  let filtered = products.filter(p => p.name.toLowerCase().includes(query));

  if (sortType === "price-desc") filtered.sort((a, b) => b.price - a.price);
  if (sortType === "price-asc")  filtered.sort((a, b) => a.price - b.price);

  renderProducts(filtered);
}

// Управління кошиком (Шторка)
function toggleCartDrawer(e) {
  if (e) e.preventDefault();
  document.querySelector("#cartDrawer")?.classList.toggle("open");
  document.querySelector("#cartOverlay")?.classList.toggle("open");
}

// Додавання у кошик
function handleAddToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  cart.push(product);
  saveCartState();
  renderCart();

  if (!document.querySelector("#cartDrawer")?.classList.contains("open")) {
    toggleCartDrawer();
  }
}

// Оформлення замовлення (Checkout)
function handleCheckout() {
  if (cart.length === 0) {
    alert("Ваш кошик порожній!");
    return;
  }

  orders.push({
    id: `ORD-${Date.now()}`,
    date: new Date().toLocaleString(),
    items: [...cart],
    total: cart.reduce((sum, item) => sum + item.price, 0),
  });

  saveOrdersState();
  cart = [];
  saveCartState();
  renderCart();
  toggleCartDrawer();

  alert("Замовлення успішно оформлено! Перевірте вкладку Orders.");
}

/* ==========================================================================
   4. EVENT LISTENERS & DELEGATION (СЛУХАЧІ ПОДІЙ ТА ДЕЛЕГУВАННЯ)
   ========================================================================== */

function setupEventListeners() {
  // --- Статичні кнопки та форми ---
  document.querySelector("#addBtn")?.addEventListener("click", handleAddProduct);
  document.querySelector("#searchInput")?.addEventListener("input", handleSearchAndSort);
  document.querySelector("#sortSelect")?.addEventListener("change", handleSearchAndSort);
  document.querySelector("#checkoutBtn")?.addEventListener("click", handleCheckout);

  // --- Навігація між вкладками ---
  document.querySelector("#inventoryLink")?.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#shopView")?.classList.remove("is-hidden");
    document.querySelector("#ordersView")?.classList.add("is-hidden");
  });

  document.querySelector("#ordersLink")?.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#shopView")?.classList.add("is-hidden");
    document.querySelector("#ordersView")?.classList.remove("is-hidden");
    renderOrders();
  });

  // --- Керування шторкою кошика ---
  ["#cartLink", "#closeCartBtn", "#cartOverlay"].forEach(selector => {
    document.querySelector(selector)?.addEventListener("click", toggleCartDrawer);
  });

  // --- ДЕЛЕГУВАННЯ: Кліки на товари (Вітрина) ---
  document.querySelector("#productsList")?.addEventListener("click", (e) => {
    const action = e.target.dataset.action;
    const id = parseInt(e.target.dataset.id, 10);

    if (action === "add-to-cart") handleAddToCart(id);
    
    if (action === "delete-product") {
      products = products.filter(p => p.id !== id);
      saveProductsState();
      renderProducts();
      updateStoreTotal();
    }
  });

  // --- ДЕЛЕГУВАННЯ: Видалення з кошика ---
  document.querySelector("#cartItems")?.addEventListener("click", (e) => {
    if (e.target.dataset.action === "remove-from-cart") {
      const index = parseInt(e.target.dataset.index, 10);
      cart.splice(index, 1);
      saveCartState();
      renderCart();
    }
  });
}

/* ==========================================================================
   5. INITIALIZATION (ЗАПУСК ДОДАТКУ ТА КЕРУВАННЯ HTMX)
   ========================================================================== */

let isInitialized = false;

function initApp() {
  const addBtn = document.querySelector("#addBtn");
  const productsContainer = document.querySelector("#productsList");

  // Запуск відбувається тільки тоді, коли блоки фізично з'явилися на сторінці
  if (addBtn && productsContainer && !isInitialized) {
    console.log("🎯 DOM елементи знайдено. Активуємо додаток!");
    
    setupEventListeners();
    renderProducts();
    renderCart();
    updateStoreTotal();

    isInitialized = true;
  }
}

// Слухачі для звичайного завантаження та для довантаження через HTMX
document.addEventListener("DOMContentLoaded", initApp);
document.body.addEventListener("htmx:afterSettle", initApp);