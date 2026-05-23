console.log("Hello, World! This is a simple JavaScript file.");

/* ==========================================
   1. STATE (СТАН ДОДАТКУ - ДАНІ)
========================================== */
const defaultProducts = [
  {
    id: 1,
    name: "Rolex Submariner",
    price: 12500,
    quantity: 2,
    image:
      "https://media.rolex.com/image/upload/q_auto/f_auto/c_limit,w_1920/v1775305300/rolexcom/094398bf1f99/navigation/professional-watches-submariner-navigation-portrait",
  },
  {
    id: 2,
    name: "Omega Speedmaster",
    price: 6800,
    quantity: 5,
    image:
      "https://www.omegawatches.com/media/catalog/product/o/m/omega-speedmaster-moonwatch-professional-co-axial-master-chronometer-chronograph-42-mm-31030425004001-5bcb6e.png?w=1100",
  },
  {
    id: 3,
    name: "Casio G-Shock GA-2100",
    price: 120,
    quantity: 15,
    image:
      "https://www.casio.com/content/dam/casio/product-info/locales/de/de/timepiece/product/watch/G/GA/GA2/ga-2100bm-7a2/assets/GA-2100BM-7A2.png.transform/main-visual-pc/image.png",
  },
  {
    id: 4,
    name: "Tissot Le Locle",
    price: 650,
    quantity: 8,
    image:
      "https://www.tissotwatches.com/dw/image/v2/BKKD_PRD/on/demandware.static/-/Sites-Tissot-Catalogue/default/dwf7ea6df5/product-pictures/45f68220-5164-45bd-862a-20d5f845f9ab_T006-407-16-033-01_shadow.png?sm=fit&sw=1680&sh=1680,gravity=center",
  },
  {
    id: 5,
    name: "Seiko 5 Sports",
    price: 300,
    quantity: 12,
    image:
      "https://owp.klarna.com/product/640x640/3021705635/Seiko-5-Sports-(SRPJ83K1).jpg?ph=true",
  },
  {
    id: 6,
    name: "Cartier Tank",
    price: 4200,
    quantity: 3,
    image:
      "https://www.weber-juwelier.de/cdn/2000x2000/e/7/5/2/e752624340260efab42f48e151b959edda07a2fb_WSTA0041_01_PROD_1058_Cartier_2000x2000_33_7x25_5mm.jpg",
  },
  {
    id: 7,
    name: "Patek Philippe Nautilus",
    price: 85000,
    quantity: 1,
    image:
      "https://www.uhren2000.de/cdn/shop/files/3900-001-G11.jpg?v=1732704593",
  },
  {
    id: 8,
    name: "Apple Watch Series 9",
    price: 450,
    quantity: 10,
    image:
      "https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/apple-watch-series-9.png",
  },
];

let products =
  JSON.parse(localStorage.getItem("myProducts")) || defaultProducts;
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ==========================================
   2. DOM ELEMENTS (ЕЛЕМЕНТИ ІНТЕРФЕЙСУ)
========================================== */
// Форма додавання
const nameInput = document.querySelector("#name");
const priceInput = document.querySelector("#price");
const qtyInput = document.querySelector("#qty");
const imageInput = document.querySelector("#image");
const addBtn = document.querySelector("#addBtn");

// Вітрина та пошук
const searchInput = document.querySelector("#searchInput");
const productsContainer = document.querySelector("#productsList");
const totalPriceEl = document.querySelector("#totalPrice");

// Кошик
const cartBtn = document.querySelector("#cartLink");
const cartDrawer = document.querySelector("#cartDrawer");
const closeCartBtn = document.querySelector("#closeCartBtn");
const cartOverlay = document.querySelector("#cartOverlay");
const cartItemsContainer = document.querySelector("#cartItems");
const cartTotalPriceEl = document.querySelector("#cartTotalPrice");
const cartCountBadge = document.querySelector(".cart-count"); // Цифра біля іконки кошика
const sortSelect = document.querySelector("#sortSelect");

/* ==========================================
   3. EVENT LISTENERS (СЛУХАЧІ ПОДІЙ)
========================================== */
addBtn.addEventListener("click", addProduct);
searchInput.addEventListener("input", searchProducts);

// Управління відкриттям/закриттям кошика
cartBtn.addEventListener("click", toggleCartDrawer);
closeCartBtn.addEventListener("click", toggleCartDrawer);
cartOverlay.addEventListener("click", toggleCartDrawer);
sortSelect.addEventListener("change", searchProducts);
// Викликаємо ту саму функцію, що і пошук, щоб фільтри працювали разом

/* ==========================================
   4. FUNCTIONS - PRODUCTS LIST (ВІТРИНА)
========================================== */
function addProduct() {
  const name = nameInput.value;
  const price = Number(priceInput.value);
  const quantity = Number(qtyInput.value);
  const image = imageInput.value;

  if (!name || !price || !quantity) {
    alert("Please fill in all fields with valid values.");
    return;
  }

  const product = {
    id: Date.now(),
    name,
    price,
    quantity,
    image: image || "https://example.com/default-watch.jpg",
  };

  products.push(product);
  renderProducts();
  clearInputs();
  updateTotalPrice();
  saveToLocalStorage();
}

function renderProducts(productsToRender = products) {
  productsContainer.innerHTML = "";

  if (productsToRender.length === 0) {
    productsContainer.innerHTML = `<p class="no-results">No watches found matching your search... 🔍</p>`;
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
        <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart 🛒</button>
        <button class="delete-btn" onclick="deleteProduct(${product.id})">Remove 🗑️</button>
      </div>
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

function searchProducts() {
  const query = searchInput.value.toLowerCase();
  const sortType = sortSelect.value;

  // 1. Спочатку фільтруємо за текстом
  let filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query),
  );

  // 2. Потім сортуємо відфільтрований список
  if (sortType === "price-desc") {
    // Від вищої до нижчої
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortType === "price-asc") {
    // Від нижчої до вищої
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  // 3. Відображаємо фінальний результат
  renderProducts(filteredProducts);
}

function clearInputs() {
  nameInput.value = "";
  priceInput.value = "";
  qtyInput.value = "";
  imageInput.value = "";
}

function updateTotalPrice() {
  const total = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0,
  );
  totalPriceEl.textContent = `Total Value: $${total.toFixed(2)}`;
}

function saveToLocalStorage() {
  localStorage.setItem("myProducts", JSON.stringify(products));
}

/* ==========================================
   5. FUNCTIONS - CART (КОШИК)
========================================== */
function toggleCartDrawer(e) {
  if (e) e.preventDefault();
  cartDrawer.classList.toggle("open");
  cartOverlay.classList.toggle("open");
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  cart.push(product);

  renderCart();
  saveCartToLocalStorage();

  // Додатково: відкриваємо кошик при додаванні товару, щоб юзер побачив результат
  if (!cartDrawer.classList.contains("open")) {
    toggleCartDrawer();
  }
}

function renderCart() {
  cartItemsContainer.innerHTML = "";

  // 1. Оновлюємо бейдж (цифру) у хедері
  cartCountBadge.textContent = cart.length;

  // 2. Якщо кошик порожній — показуємо повідомлення
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p class="cart-drawer__empty">Your cart is empty.</p>`;
    cartTotalPriceEl.textContent = `$0.00`;
    return;
  }

  // 3. Малюємо товари в кошику
  let cartTotal = 0;

  cart.forEach((item, index) => {
    cartTotal += item.price;

    const cartItemEl = document.createElement("div");
    cartItemEl.classList.add("cart-item"); // Наш головний флекс-контейнер

    cartItemEl.innerHTML = `
    <img src="${item.image}" alt="${item.name}" class="cart-item__img">
    
    <div class="cart-item__info">
      <h4 class="cart-item__name">${item.name}</h4>
      <p class="cart-item__price">$${item.price.toFixed(2)}</p>
    </div>
    
    <button class="cart-item__remove" onclick="removeFromCart(${index})">✖️</button>
  `;
    cartItemsContainer.appendChild(cartItemEl);
  });

  // 4. Оновлюємо загальну суму кошика
  cartTotalPriceEl.textContent = `$${cartTotal.toFixed(2)}`;
}

function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
  saveCartToLocalStorage();
}

// orders --- від цього коду розібратись

let orders = JSON.parse(localStorage.getItem("orders")) || [];

// DOM елементи для навігації
const inventoryLink = document.querySelector("#inventoryLink");
const ordersLink = document.querySelector("#ordersLink");
const shopView = document.querySelector("#shopView");
const ordersView = document.querySelector("#ordersView");
const ordersListContainer = document.querySelector("#ordersList");

// Слухачі подій для навігації
inventoryLink.addEventListener("click", (e) => {
  e.preventDefault();
  shopView.classList.remove("is-hidden"); // Показуємо магазин
  ordersView.classList.add("is-hidden"); // Ховаємо замовлення
});

// Слухач для кнопки "Orders"
ordersLink.addEventListener("click", (e) => {
  e.preventDefault();
  shopView.classList.add("is-hidden"); // Ховаємо магазин
  ordersView.classList.remove("is-hidden"); // Показуємо замовлення
  renderOrders();
});

const checkoutBtn = document.querySelector("#checkoutBtn");

checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Ваш кошик порожній!");
    return;
  }

  // Створюємо нове замовлення
  const newOrder = {
    id: `ORD-${Date.now()}`,
    date: new Date().toLocaleString(),
    items: [...cart],
    total: cart.reduce((sum, item) => sum + item.price, 0),
  };

  orders.push(newOrder);
  localStorage.setItem("orders", JSON.stringify(orders));

  // Очищуємо кошик
  cart = [];
  saveCartToLocalStorage();
  renderCart();
  toggleCartDrawer();

  alert("Замовлення успішно оформлено! Перевірте вкладку Orders.");
});

function renderOrders() {
  ordersListContainer.innerHTML = "";

  if (orders.length === 0) {
    ordersListContainer.innerHTML = `<p class="orders-empty">У вас ще немає замовлень. 📋</p>`;
    return;
  }

  // Виводимо замовлення (нові зверху)
  orders
    .slice()
    .reverse()
    .forEach((order) => {
      const orderEl = document.createElement("div");
      // Замість стилей в JS — просто даємо клас!
      orderEl.classList.add("order-item");

      orderEl.innerHTML = `
      <div class="order-item__header">
        <strong class="order-item__id">ID: ${order.id}</strong>
        <span class="order-item__date">${order.date}</span>
      </div>
      <div class="order-item__content">
        ${order.items
          .map(
            (item) => `
          <div class="order-item__product">
            <span class="order-item__product-name">${item.name}</span>
            <span class="order-item__product-price">$${item.price.toFixed(2)}</span>
          </div>
        `,
          )
          .join("")}
      </div>
      <div class="order-item__footer">
        Total: $${order.total.toFixed(2)}
      </div>
    `;
      ordersListContainer.appendChild(orderEl);
    });
}
/* ==========================================
   6. INITIALIZATION (ЗАПУСК ПРИ ЗАВАНТАЖЕННІ)
========================================== */
renderProducts();
updateTotalPrice();
renderCart(); // Одразу малюємо кошик (якщо там вже щось збережено)
