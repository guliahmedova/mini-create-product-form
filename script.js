let savedProducts = JSON.parse(localStorage.getItem('products')) || [];

function init() {
    const table = document.querySelector('.table');
    const count = document.getElementById('count');
    const total = document.getElementById('total');

    let totalPrice = 0;

    table.innerHTML = "";

    savedProducts?.forEach(element => {
        const h4 = document.createElement('h4');
        const button = document.createElement('button');
        const column = document.createElement('div');

        button.addEventListener('click', () => deleteProduct(element.id));

        totalPrice += Number(element.price);

        button.classList.add('delete_btn');
        column.classList.add('column');

        h4.textContent = `${element.title} (${element.price}AZN)`;
        button.textContent = 'Sil';

        column.append(h4, button);
        table.appendChild(column);
    });

    count.textContent = savedProducts.length;
    total.textContent = totalPrice;
};

function addProduct() {
    const uuid = (Math.random() + 1).toString(36).substring(2);

    const title = document.getElementById('title').value
    const price = document.getElementById('price').value

    if (title && price) {
        const newProduct = {
            id: uuid,
            title: title,
            price: price
        };

        savedProducts.push(newProduct);
        localStorage.setItem('products', JSON.stringify(savedProducts));
        init();
        document.getElementById('title').value = "";
        document.getElementById('price').value = "";
    };
};

function deleteProduct(id) {
    savedProducts = savedProducts?.filter(element => element.id !== id);
    localStorage.setItem('products', JSON.stringify(savedProducts));
    init();
};

document.addEventListener('DOMContentLoaded', init);