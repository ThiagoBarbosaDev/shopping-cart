require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  // implemente seus testes aqui
  it('should be a function', () => {
    expect(typeof fetchProducts).toBe('function')
  });
  test('should return expected result when called with the expected argument', async () => {
    const result = await fetchProducts('computador');
    expect(result).resolves.toBe('teste')
  });
});
