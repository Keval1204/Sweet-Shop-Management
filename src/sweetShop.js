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
}

module.exports = SweetShop;
