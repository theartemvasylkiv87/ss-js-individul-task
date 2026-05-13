console.log("Hello, World! This is a simple JavaScript file.");

// Посилання на поля вводу (Inputs)
const nameInput = document.querySelector('#name');
const priceInput = document.querySelector('#price');
const qtyInput = document.querySelector('#qty');

// Посилання на кнопки (Buttons)
const addBtn = document.querySelector('#addBtn');

// Посилання на елементи керування та відображення
const searchInput = document.querySelector('#searchInput');
const productsContainer = document.querySelector('#productsList'); // Container — бо він містить список

// Наш масив даних (модель)
let products = JSON.parse(localStorage.getItem('myProducts')) || [];

// Одразу малюємо те, що дістали з пам'яті
renderProducts();
updateTotalPrice();

addBtn.addEventListener('click', addProduct)

function addProduct() {
    const name = nameInput.value;
    const price = Number(priceInput.value);
    const quantity = Number(qtyInput.value);

    if (!name || !price || !quantity) {
        alert('Please fill in all fields with valid values.');
        return
    }

    const product = {
        id: Date.now(),
        name: name,
        price: price,
        quantity: quantity
    }
    products.push(product);
    console.log(products);
    renderProducts();
    clearInputs()
    updateTotalPrice();
    saveToLocalStorage()
}

function renderProducts(productsToRender = products) {

    productsContainer.innerHTML = '';

    productsToRender.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product-item');
        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price.toFixed(2)}</p>
            <p>Quantity: ${product.quantity}</p>
            <button onclick="deleteProduct(${product.id})">Видалити 🗑️</button>
        `;
        productsContainer.appendChild(productElement);
    })
}

function deleteProduct(id) {
    products = products.filter(product => product.id !== id);
    renderProducts();
    updateTotalPrice();
    saveToLocalStorage();
}

function updateTotalPrice() {
    const totalPrice = document.querySelector('#totalPrice');
    const total = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    totalPrice.textContent = `Total: $${total.toFixed(2)}`;
}

function clearInputs() {
    nameInput.value = '';
    priceInput.value = '';
    qtyInput.value = '';
}

searchInput.addEventListener('input', searchProducts);

function searchProducts() {
    const query = searchInput.value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(query));
    renderProducts(filteredProducts);
}


function saveToLocalStorage() {
    localStorage.setItem('myProducts', JSON.stringify(products));
}
// console.log(nameAddProduct)
// console.log(priceAddProduct)
// console.log(quantityAddProduct)
// console.log(addProductButton)
// console.log(searchInput)
