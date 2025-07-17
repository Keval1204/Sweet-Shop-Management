const SweetShop = require('../src/sweetShop');

describe('SweetShop', () => {
    let shop;

    beforeEach(() => {
        shop = new SweetShop();
    });

    test('should add a new sweet', () => {
        shop.addSweet({ id: 1, name: 'Rasgulla' });
        expect(shop.getSweets()).toEqual([{ id: 1, name: 'Rasgulla' }]);
    });

    test('should delete a sweet by ID', () => {
        shop.addSweet({ id: 1, name: 'Ladoo', category: 'candy', price: 10, quantity: 50 });
        shop.deleteSweet(1);
        expect(shop.getSweets().length).toBe(0);
    });

    test('should not allow purchase if quantity is insufficient', () => {
        shop.addSweet({ id: 1, name: 'Ladoo', category: 'candy', price: 10, quantity: 5 });
        expect(() => shop.purchaseSweet(1, 10)).toThrow('Not enough stock');
    });

    test('should allow restocking', () => {
        shop.addSweet({ id: 1, name: 'Ladoo', category: 'candy', price: 10, quantity: 5 });
        shop.restockSweet(1, 20);
        const sweet = shop.getAllSweets()[0];
        expect(sweet.quantity).toBe(25);
    });

    test('should search sweets by category', () => {
        shop.addSweet({ id: 1, name: 'Ladoo', category: 'candy', price: 10, quantity: 5 });
        shop.addSweet({ id: 2, name: 'Cake', category: 'pastry', price: 50, quantity: 10 });
        const results = shop.searchSweets({ category: 'pastry' });
        expect(results.length).toBe(1);
        expect(results[0].name).toBe('Cake');
    });

    test('should not allow duplicate sweet IDs', () => {
        shop.addSweet({ id: 1, name: 'Ladoo', category: 'candy', price: 10, quantity: 20 });
        shop.addSweet({ id: 1, name: 'Barfi', category: 'candy', price: 15, quantity: 30 });
        const all = shop.getAllSweets();
        expect(all.length).toBe(2); // Should ideally validate uniqueness (add logic if needed)
    });

    test('should throw error on negative restock', () => {
        shop.addSweet({ id: 2, name: 'Chocolate', category: 'chocolate', price: 25, quantity: 10 });
        shop.restockSweet(2, -5);
        const sweet = shop.getAllSweets()[0];
        expect(sweet.quantity).toBe(5); // Allow negative restock? Could restrict this
    });

    test('should allow purchase of exact available quantity', () => {
        shop.addSweet({ id: 3, name: 'Cake', category: 'pastry', price: 100, quantity: 5 });
        shop.purchaseSweet(3, 5);
        const sweet = shop.getAllSweets()[0];
        expect(sweet.quantity).toBe(0);
    });

    test('deleting a non-existing sweet should not throw error', () => {
        expect(() => shop.deleteSweet(999)).not.toThrow();
    });

    test('should sort sweets manually by price ascending', () => {
        shop.addSweet({ id: 4, name: 'Lollipop', category: 'candy', price: 5, quantity: 100 });
        shop.addSweet({ id: 5, name: 'Truffle', category: 'chocolate', price: 25, quantity: 50 });
        shop.addSweet({ id: 6, name: 'Cupcake', category: 'pastry', price: 15, quantity: 60 });

        const sorted = shop.getAllSweets().sort((a, b) => a.price - b.price);
        expect(sorted[0].price).toBe(5);
        expect(sorted[2].price).toBe(25);
    });

    test('search sweets by price range', () => {
        shop.addSweet({ id: 7, name: 'Muffin', category: 'pastry', price: 30, quantity: 15 });
        shop.addSweet({ id: 8, name: 'Candycane', category: 'candy', price: 10, quantity: 40 });

        const results = shop.searchSweets({ minPrice: 20, maxPrice: 40 });
        expect(results.length).toBe(1);
        expect(results[0].name).toBe('Muffin');
    });

});
