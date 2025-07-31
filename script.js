// Recuperando os valores do HTML para manipulção DOM do Javascript
const form = document.getElementById('form');
const product = document.getElementById('product');
const price = document.getElementById('price');
const category = document.getElementById('category');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    checkForm();
});

product.addEventListener('blur', (event) => {
    checkInputProduct();
});

price.addEventListener('blur', (event) => {
    checkInputPrice();
});

category.addEventListener('blur', (event) => {
    checkInputCategory();
});

function checkInputProduct() {
    const productValue = product.value;

    if (productValue === '') {
        errorInput(product, 'Digite o nome do produto');
    } else {
        const formItem = product.parentElement;
        formItem.className = 'form-content';
    }

}

function checkInputPrice() {
    const priceValue = price.value;

    if (priceValue === '') {
        errorInput(price, 'O preço é obrigatório.');
    } else if (priceValue < 1) {
        errorInput(price, 'O preço precisa ser maior que 0.');
    } else {
        const formItem = price.parentElement;
        formItem.className = 'form-content';
    }
}

function checkInputCategory() {
    const categoryValue = category.value;

    if (categoryValue === '') {
        errorInput(category, 'A categoria é obrigatória.');
    } else {
        const formItem = category.parentElement;
        formItem.className = 'form-content';
    }
}

function checkForm() {
    checkInputProduct();
    checkInputPrice();
    checkInputCategory();

    const formItems = form.querySelectorAll('.form-content');

    const isValid = [...formItems].every((item) => {
        return item.className === 'form-content'
    });

    if (isValid) {
        alert('PRODUTO CADASTRADO COM SUCESSO!');
        form.reset();
    }

}

function errorInput(input, message) {
    const formItem = input.parentElement;
    const textMessage = formItem.querySelector('a');

    textMessage.innerText = message;

    formItem.className = 'form-content error';
}

class Product {
    constructor(name, price, category) {
        this.name = name;
        this.price = price;
        this.category = category;
    }
}

class ProductManager {
    constructor() {
        this.listElement = document.getElementById('orderedList');
        this.products = JSON.parse(localStorage.getItem('produtos')) || [];
        this.listarProdutos();
    }

    adicionarProduto(produto) {
        this.products.push(produto);
        this.salvarProdutos();
        this.listarProdutos();
    }

    removerProduto(index) {
        this.products.splice(index, 1);
        this.salvarProdutos();
        this.listarProdutos();
    }

    listarProdutos() {
        this.listElement.innerHTML = '';

        this.products.forEach((produto, index) => {
            const li = document.createElement('li');

            const span = document.createElement('span');
            span.textContent = `${produto.name} - R$${parseFloat(produto.price).toFixed(2)} - ${produto.category}`;

            const btn = document.createElement('button');
            btn.textContent = 'Remover';
            btn.onclick = () => this.removerProduto(index);

            li.appendChild(span);
            li.appendChild(btn);
            this.listElement.appendChild(li);
        });
    }

    salvarProdutos() {
        localStorage.setItem('produtos', JSON.stringify(this.products));
    }
}

// Instanciando o gerenciador
const manager = new ProductManager();

function registerProduct() {
    const name = product.value.trim();
    const priceValue = parseFloat(price.value);
    const cat = category.value.trim();

    if (name && priceValue > 0 && cat) {
        const newProduct = new Product(name, priceValue, cat);
        manager.adicionarProduto(newProduct);
    }
}