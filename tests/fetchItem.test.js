require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  // implemente seus testes aqui
  it('should be a function', () => {
    expect(typeof fetchItem).toBe('function')
  });
  it('should test if fetch has been called', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('should use the correct endpoint when called', async () => {
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527'
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('should return the correct result', async () => {
    const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(item)
  });
  it('should return an expected error message', async () => {
    const failRequest = await fetchItem();
    expect(failRequest).toEqual(new Error('You must provide an url'))
  });
});
