// const { fetchItem } = require('./helpers/fetchItem');
const cartOl = document.querySelector('.cart__items');
const totalPrice = document.querySelector('.total-price');

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

const createLoading = () => {
  const loading = createCustomElement('div', 'loading', 'carregando...');
  const cartContainer = document.querySelector('.cart');
  cartContainer.appendChild(loading);
};

const removeLoading = () => {
  const loading = document.querySelector('.loading');
  const cartContainer = document.querySelector('.cart');
  cartContainer.removeChild(loading);
};

const updateCartTotal = () => {
  const cartItemList = Array.from(document.querySelectorAll('.cart__item'));
  let sum = 0;
  cartItemList.forEach((item) => {
  const itemPrice = parseFloat(item.innerText.split('$')[1], 10);
  sum += itemPrice;
});
  totalPrice.innerText = Math.round((sum + Number.EPSILON) * 100) / 100;
  // Fonte:
  // https://www.codingem.com/javascript-how-to-limit-decimal-places/#:~:text=To%20limit
  // %20decimal%20places%20in%20JavaScript%2C%20use%20the%20toFixed(),the%20number%20of
  // %20decimal%20places.

  // Jeito mais legal de fazer mas quebra o teste:
  // totalPrice.innerText = (new Intl.NumberFormat((pt-BR), { minimumFractionDigits: 2 }).format(sum));
};

const cartItemClickListener = (event) => {
  // coloque seu c??digo aqui
 console.log(event.target.innerHTML)
  cartOl.removeChild(event.target);
  updateCartTotal();
  saveCartItems(cartOl.innerHTML);
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

// pergunta
// a fun????o  createProductItemElement vai esperar um Obj com chaves com nomes diferentes
// Tem algum jeito melhor de renomear/desestruturar as chaves da API para passar como
// argumento para a fun????o?
const cartAppendLiEventListener = (newSection) => {
  const itemButton = newSection.lastChild;
  itemButton.addEventListener('click', async () => {
    const idNum = (getSkuFromProductItem(newSection));
    createLoading();
    await fetchItem(idNum)
      .then((cart) => {
      const cartData = { sku: cart.id, name: cart.title, salePrice: cart.price };
      const newCartLi = createCartItemElement(cartData);
      cartOl.appendChild(newCartLi);
      saveCartItems(cartOl.innerHTML);
      updateCartTotal();
      removeLoading();
      });
  });
};

const appendItem = ({ id, title, thumbnail, price }) => {
  const newPc = { sku: id, name: title, image: thumbnail, salePrice: price };
  const itemSection = document.querySelector('.items');
  const newSection = createProductItemElement(newPc);
  cartAppendLiEventListener(newSection);
  itemSection.appendChild(newSection);
};
// Pergunta: Pq quando eu uso o responde a fun????o n??o funciona?
const renderItems = async () => {
  createLoading();
  await fetchProducts('computador')
    // .then((response) => response.JSON())
    .then((data) => {
      removeLoading(); [...data.results]
      .forEach((pc) => {
        appendItem(pc);
      });
    });
};

const renderStorage = () => {
  cartOl.innerHTML = getSavedCartItems();
  const cartItemList = Array.from(document.querySelectorAll('.cart__item'));
  cartItemList.forEach((li) => li.addEventListener('click', cartItemClickListener));
  updateCartTotal();
};

const emptyCart = () => {
cartOl.innerHTML = '';
updateCartTotal();
localStorage.removeItem('cartItems');
};

const buttonEmptyCart = document.querySelector('.empty-cart');
buttonEmptyCart.addEventListener('click', emptyCart);

window.onload = () => { 
  renderItems();
  renderStorage();
};
