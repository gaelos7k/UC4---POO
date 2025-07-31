// Recuperando os valores do HTML para manipulção DOM do Javascript
const form = document.getElementById('form');
const product = document.getElementById('product');
const price = document.getElementById('price');
const category = document.getElementById('category');

//Quando o usuário clicar em cadastrar produto, serão feitas as verificações com a funcão checkForm();
form.addEventListener('submit', (event) => {
    event.preventDefault();

    checkForm();
});

//Funcionalidades para quando o usuário sair dos campos sem preenchimento correto
product.addEventListener('blur', (event) => {
    checkInputProduct();
});

price.addEventListener('blur', (event) => {
    checkInputPrice();
});

category.addEventListener('blur', (event) => {
    checkInputCategory();
});

//Função para verificar a entrada do nome do produto
function checkInputProduct() {
    const productValue = product.value;

    if (productValue === '') {
        errorInput(product, 'Digite o nome do produto.');
    } else {
        const formItem = product.parentElement;
        formItem.className = 'form-content';
    }

}

//Função para verificar a entrada do preço do produto
function checkInputPrice() {
    const priceValue = price.value;

    if (priceValue === '') {
        errorInput(price, 'O preço é obrigatório.');
    } else if (priceValue < 1) {
        errorInput(price, 'O preço precisa ser maior que R$0.');
    } else {
        const formItem = price.parentElement;
        formItem.className = 'form-content';
    }
}

//Função para verificar a entrada da categoria do produto
function checkInputCategory() {
    const categoryValue = category.value;

    if (categoryValue === '') {
        errorInput(category, 'A categoria é obrigatória.');
    } else {
        const formItem = category.parentElement;
        formItem.className = 'form-content';
    }
}

//Função para verificar todas as entrada do usuário uma a uma e verificar se todas estão preenchidas
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

//Função para quando houver erro na entrada do usuário
function errorInput(input, message) {
    const formItem = input.parentElement;
    const textMessage = formItem.querySelector('a');

    textMessage.innerText = message;

    formItem.className = 'form-content error';
}


//Criação classe do produto
class Product {
    constructor(name, price, category) {
        this.name = name;
        this.price = price;
        this.category = category;
    }
}

//Criação da classe para gerenciar os produtos
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

    //Método do botão remover para remover o item desejado
    removerProduto(index) {
        this.products.splice(index, 1);
        this.salvarProdutos();
        this.listarProdutos();
    }

    //Método para criar os itens da lista de produtos cadastrados
    listarProdutos() {
        this.listElement.innerHTML = '';

        this.products.forEach((produto, index) => {
            const li = document.createElement('li');

            const span = document.createElement('span');
            span.textContent = `${produto.name} - R$${parseFloat(produto.price).toFixed(2)} - ${produto.category}`; //Preço dos produtos com valores reais

            //Criação do botão 'Remover' para cada item de lista criado
            const btn = document.createElement('button');
            btn.textContent = 'Remover';
            btn.onclick = () => this.removerProduto(index);

            li.appendChild(span);
            li.appendChild(btn);
            this.listElement.appendChild(li);
        });
    }

    //Método para persistir os dados no local storage
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
        //Instânciando a classe do produto
        const newProduct = new Product(name, priceValue, cat);
        manager.adicionarProduto(newProduct);
    }
}