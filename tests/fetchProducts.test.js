require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it ('is a function', () => {
    expect(typeof fetchProducts).toMatch('function');
  })
  it ('fetch has been called when "computador" is their parameter', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  })
  it('fetch has been called with endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador" when their parameter is "computador"', async () => {
    await fetchProducts("computador");
    const URL = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect(fetch).toHaveBeenCalledWith(URL);
  });
  it('', async () => {
    const result = await fetchProducts("computador");
    expect(result).toEqual(computadorSearch);
  });
  it('return error "You must provide an url"', async () => {
    const failedRequest = await fetchProducts();
    expect(failedRequest).toEqual(new Error('You must provide an url'));
  });
});
