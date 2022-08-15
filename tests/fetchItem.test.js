require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('is a function', () => {
    expect(typeof fetchItem).toMatch('function');
  })
  it('', async () => {
    await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalled();
  })
  it('', async () => {
    await fetchItem('MLB1615760527')
    const URL = 'https://api.mercadolibre.com/items/MLB1615760527';
    expect(fetch).toHaveBeenCalledWith(URL);
  })
  it('', async () => {
    const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(item);
  })
});
