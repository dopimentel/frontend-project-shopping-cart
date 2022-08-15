const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  document.querySelector('.cart__items').removeChild(event.target);
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

window.onload = () => {
fetchProducts('computador').then((data) => data.results
  .forEach(({ id: sku, title: name, thumbnail: image }) => {
    const items = document.querySelector('.items');
    const element = createProductItemElement({ sku, name, image });
    items.appendChild(element);
    element.querySelector('.item__add').addEventListener('click', async () => {
      const itemData = await fetchItem(getSkuFromProductItem(element));
      const { id, title, price } = itemData;
      const product = { sku: id, name: title, salePrice: price };
      const elementLi = createCartItemElement(product);
      const cartItems = document.querySelector('.cart__items');
      cartItems.appendChild(elementLi);
    });
  }));
};
