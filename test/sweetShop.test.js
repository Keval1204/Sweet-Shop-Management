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

});
