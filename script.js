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

const totalPrice = createCustomElement('span', 'total-price', 'Subtotal:');
const emptyCart = document.querySelector('.empty-cart');
emptyCart.parentElement.insertBefore(totalPrice, emptyCart);
const subTotal = (price) => {
  const result = [];
  result.push(price);
  return result;
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const items = document.querySelector('.items');
const loadingElement = createCustomElement('span', 'loading', 'carregando...');

const CreateList = async () => {
loading();
const data = await fetchProducts('computador');
data.results.forEach(({ id: sku, title: name, thumbnail: image }) => {
    const elementSection = createProductItemElement({ sku, name, image });
    items.appendChild(elementSection);
  });
loaded();
};

const CreateCartList = async (event) => {
  const itemData = await fetchItem(getSkuFromProductItem(event.target.parentElement));
  const { id, title, price } = itemData;
  const product = { sku: id, name: title, salePrice: price };
  const elementLi = createCartItemElement(product);
  cartItems.appendChild(elementLi);
  saveCartItems(cartItems.innerHTML);
  subTotal(price);
};

const addListItemsListener = async () => {
  await CreateList();
  btnsAdd = document.querySelectorAll('.item__add');
  for (let index = 0; index < btnsAdd.length; index += 1) {
    btnsAdd[index].addEventListener('click', CreateCartList);
  }
};

totalPrice.innerText = 'Subtotal:';
const clearCart = () => {
  while (cartItems.children.length > 0) {
    cartItems.removeChild(cartItems.firstChild);
    saveCartItems(cartItems.innerHTML);
  }
};
emptyCart.addEventListener('click', clearCart);

const initialRenderization = () => {
  if (getSavedCartItems() !== null) {
    cartItems.innerHTML = getSavedCartItems();
    for (let index = 0; index < cartItems.children.length; index += 1) {
      cartItems.children[index].addEventListener('click', cartItemClickListener);
    }
  }
};

loading = () => items.appendChild(loadingElement);
loaded = () => items.removeChild(loadingElement);

window.onload = () => {
  addListItemsListener();
  initialRenderization();
};
