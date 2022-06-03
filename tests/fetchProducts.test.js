require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  // implemente seus testes aqui
  it('should be a function', () => {
    expect(typeof fetchProducts).toBe('function')
  });
  it('should test if fetch has been called', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('should use the correct endpoint when called', async () => {
    const query = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(query);
  });
  it('should return the correct result', async () => {
    const result = await fetchProducts('computador');
    expect(result).toEqual(computadorSearch)
  });
  it('should return an expected error message', async () => {
    const failRequest = await fetchProducts();
    expect(failRequest).toEqual(new Error('You must provide an url'))
  });
});
