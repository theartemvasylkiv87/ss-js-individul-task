console.log("Hello, World! This is a simple JavaScript file.");

const nameAddProduct = document.querySelector('#name')
const priceAddProduct = document.querySelector('#price')
const quantityAddProduct = document.querySelector('#qty')
const addProductButton = document.querySelector('#addBtn')
const searchInput = document.querySelector('#searchInput')
const productsList = document.querySelector('#productsList')

const products = [];

addProductButton.addEventListener('click', addProduct)

function addProduct() {
    const name = nameAddProduct.value;
    const price = priceAddProduct.value;
    const quantity = quantityAddProduct.value;

    const product = {
        id: Date.now(),
        name: name,
        price: price,
        quantity: quantity
    }
    products.push(product);
    console.log(products);
    renderProducts();
}

function renderProducts() {

    productsList.innerHTML = '';

    products.forEach(product => {
        productsList.innerHTML += `
        <div>
        <h3>${product.name}</h3>
        <p>Price: ${product.price}</p>
        <p>Quantity: ${product.quantity}</p>
        </div>
        `
    })
}



// console.log(nameAddProduct)
// console.log(priceAddProduct)
// console.log(quantityAddProduct)
// console.log(addProductButton)
// console.log(searchInput)
