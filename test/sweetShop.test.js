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
});
