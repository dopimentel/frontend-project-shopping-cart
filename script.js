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

const cartItems = document.querySelector('.cart__items');

const cartItemClickListener = (event) => {
  cartItems.removeChild(event.target);
  saveCartItems(cartItems.innerHTML);
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const items = document.querySelector('.items');

const listCreater = async () => {
const data = await fetchProducts('computador');
data.results.forEach(({ id: sku, title: name, thumbnail: image }) => {
    const elementSection = createProductItemElement({ sku, name, image });
    items.appendChild(elementSection);
  });
};

const createCartList = async (event) => {
  const itemData = await fetchItem(getSkuFromProductItem(event.target.parentElement));
  const { id, title, price } = itemData;
  const product = { sku: id, name: title, salePrice: price };
  const elementLi = createCartItemElement(product);
  cartItems.appendChild(elementLi);
  saveCartItems(cartItems.innerHTML);
};

const addCartItem = async () => {
  await listCreater();
  addBtns = document.querySelectorAll('.item__add');
  for (let index = 0; index < addBtns.length; index += 1) {
    addBtns[index].addEventListener('click', createCartList);
  }
};

const initialRenderization = () => {
  if (getSavedCartItems() !== null) {
    cartItems.innerHTML = getSavedCartItems();
    for (let index = 0; index < cartItems.children.length; index += 1) {
      cartItems.children[index].addEventListener('click', cartItemClickListener);
    }
  }
};

window.onload = () => {
  addCartItem();
  initialRenderization();
};
