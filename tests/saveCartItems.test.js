const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  // implemente seus testes aqui
  it('should call localStorage.getItem when executed', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled()
  })
  it('should call localStorage.getItem when executed with the appropriate args', () => {
    const argumento = '<ol><li>Item</li></ol>' 
    saveCartItems(argumento);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', argumento)
  })
});
