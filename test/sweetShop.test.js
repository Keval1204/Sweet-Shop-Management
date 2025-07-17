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

});
