class SweetShop {
    constructor() {
        this.sweets = [];
    }

    addSweet(sweet) {
        this.sweets.push(sweet);
    }

    getSweets() {
        return this.sweets;
    }
}

module.exports = SweetShop;
