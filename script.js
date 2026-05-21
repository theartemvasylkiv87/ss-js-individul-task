console.log("Hello, World! This is a simple JavaScript file.");

// Посилання на поля вводу (Inputs)
const nameInput = document.querySelector("#name");
const priceInput = document.querySelector("#price");
const qtyInput = document.querySelector("#qty");
const imageInput = document.querySelector("#image");

// Посилання на кнопки (Buttons)
const addBtn = document.querySelector("#addBtn");

// Посилання на елементи керування та відображення
const searchInput = document.querySelector("#searchInput");
const productsContainer = document.querySelector("#productsList"); // Container — бо він містить список
// Початкові дані (8 годинників за замовчуванням)
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

addBtn.addEventListener("click", addProduct);

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
    name: name,
    price: price,
    quantity: quantity,
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
    productElement.classList.add("product-item"); // CSS знайде цей клас
    productElement.innerHTML = `
            <h3>${product.name}</h3>
            <img src="${product.image}" alt="${product.name}" class="product-img" />
            <p>Price: $${product.price.toFixed(2)}</p>
            <p>Quantity: ${product.quantity}</p>
            <button onclick="deleteProduct(${product.id})">Remove 🗑️</button>
        `;
    productsContainer.appendChild(productElement);
  });
}


function clearInputs() {
  nameInput.value = "";
  priceInput.value = "";
  qtyInput.value = "";
  imageInput.value = "";
}

function updateTotalPrice() {
  const totalPrice = document.querySelector("#totalPrice");
  const total = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0,
  );
  totalPrice.textContent = `Total: $${total.toFixed(2)}`;
}

function saveToLocalStorage() {
  localStorage.setItem("myProducts", JSON.stringify(products));
}

// Наш масив даних (модель)
let products =
  JSON.parse(localStorage.getItem("myProducts")) || defaultProducts;

// Одразу малюємо те, що дістали з пам'яті
renderProducts();
updateTotalPrice();

function deleteProduct(id) {
  products = products.filter((product) => product.id !== id);
  renderProducts();
  updateTotalPrice();
  saveToLocalStorage();
}

searchInput.addEventListener("input", searchProducts);

function searchProducts() {
  const query = searchInput.value.toLowerCase();
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query),
  );
  renderProducts(filteredProducts);
}

// console.log(nameAddProduct)
// console.log(priceAddProduct)
// console.log(quantityAddProduct)
// console.log(addProductButton)
// console.log(searchInput)
