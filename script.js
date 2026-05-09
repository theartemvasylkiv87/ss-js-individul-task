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
let products = [];

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
}

function renderProducts() {

    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product-item');
        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price.toFixed(2)}</p>
            <p>Quantity: ${product.quantity}</p>
        `;
        productsContainer.appendChild(productElement);
    })
}

function clearInputs() {
    nameInput.value = '';
    priceInput.value = '';
    qtyInput.value = '';
}



// console.log(nameAddProduct)
// console.log(priceAddProduct)
// console.log(quantityAddProduct)
// console.log(addProductButton)
// console.log(searchInput)
