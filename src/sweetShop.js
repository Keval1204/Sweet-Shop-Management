class SweetShop {
    constructor() {
        this.sweets = [];
    }

    addSweet(sweet) {
        this.sweets.push(sweet);
    }
    deleteSweet(id) {
        this.sweets = this.sweets.filter(sweet => sweet.id !== id);
    }

    getSweets() {
        return this.sweets;
    }
    purchaseSweet(id, quantity) {
        const sweet = this.sweets.find(s => s.id === id);
        if (!sweet || sweet.quantity < quantity) {
            throw new Error('Not enough stock');
        }
        sweet.quantity -= quantity;
    }

    restockSweet(id, quantity) {
        const sweet = this.sweets.find(s => s.id === id);
        if (sweet) {
            sweet.quantity += quantity;
        }
    }
}

module.exports = SweetShop;
