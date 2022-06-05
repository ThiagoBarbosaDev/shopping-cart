const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  // implemente seus testes aqui
  it('should call localStorage.setItem when executed', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  })
  it('should call localStorage.setItem when executed', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  })

});
