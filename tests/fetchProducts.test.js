require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it ('is a function', () => {
    expect(typeof fetchProducts).toMatch('function');
  })
  it ('has been called with "computador"', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  })
});
