const shop = new SweetShop();

function addSweet() {
    const id = parseInt(document.getElementById('sweetId').value);
    const name = document.getElementById('sweetName').value;
    const category = document.getElementById('sweetCategory').value;
    const price = parseFloat(document.getElementById('sweetPrice').value);
    const quantity = parseInt(document.getElementById('sweetQty').value);

    shop.addSweet({ id, name, category, price, quantity });
    renderAll();
}

function deleteSweet(id) {
    shop.deleteSweet(id);
    renderAll();
}

function purchaseSweet(id) {
    const qty = prompt('Enter quantity to purchase:');
    try {
        shop.purchaseSweet(id, parseInt(qty));
        renderAll();
    } catch (e) {
        alert(e.message);
    }
}

function restockSweet(id) {
    const qty = prompt('Enter quantity to restock:');
    shop.restockSweet(id, parseInt(qty));
    renderAll();
}

function searchSweets() {
    const name = document.getElementById('searchName').value;
    const category = document.getElementById('searchCategory').value;

    const results = shop.searchSweets({ name, category });
    renderTable(results);
}

function renderAll() {
    renderTable(shop.getAllSweets());
}

function renderTable(sweets) {
    const table = document.getElementById('sweetTable');
    table.innerHTML = "";

    sweets.forEach(s => {
        table.innerHTML += `
    <tr>
        <td>${s.id}</td>
        <td>${s.name}</td>
        <td>${s.category}</td>
        <td>${s.price}</td>
        <td>${s.quantity}</td>
        <td>
        <button onclick="deleteSweet(${s.id})">🗑️</button>
        <button onclick="purchaseSweet(${s.id})">🛒</button>
        <button onclick="restockSweet(${s.id})">📦</button>
        </td>
    </tr>
    `;
    });
}
function sortSweets() {
    const option = document.getElementById('sortBy').value;
    const sweets = shop.getAllSweets().slice(); // Clone array

    if (option === "priceAsc") sweets.sort((a, b) => a.price - b.price);
    else if (option === "priceDesc") sweets.sort((a, b) => b.price - a.price);
    else if (option === "qtyAsc") sweets.sort((a, b) => a.quantity - b.quantity);
    else if (option === "qtyDesc") sweets.sort((a, b) => b.quantity - a.quantity);

    renderTable(sweets);
}


renderAll();
