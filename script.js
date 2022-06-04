// const { fetchItem } = require('./helpers/fetchItem');
const cartOl = document.querySelector('.cart__items');

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
  // coloque seu código aqui
  cartOl.removeChild(event.target);
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

// a função  createProductItemElement vai esperar um Obj com chaves com nomes diferentes
// Tem algum jeito melhor de renomear/desestruturar as chaves da API para passar como
// argumento para a função?
const cartAppendLiEventListener = (newSection) => {
  newSection.lastChild.addEventListener('click', async () => {
    const idNum = (getSkuFromProductItem(newSection));
    await fetchItem(idNum)
      .then((cart) => {
        const cartData = { sku: cart.id, name: cart.title, salePrice: cart.price };
        const newCartLi = createCartItemElement(cartData);
        cartOl.appendChild(newCartLi);
      });
  });
};

const appendItem = ({ id, name, thumbnail, price }) => {
  const newPc = { sku: id, title: name, image: thumbnail, salePrice: price };
  const itemSection = document.querySelector('.items');
  const newSection = createProductItemElement(newPc);
  cartAppendLiEventListener(newSection);
  itemSection.appendChild(newSection);
};

window.onload = () => { 
  fetchProducts('computador')
    .then((data) => {
      [...data.results]
      .forEach((pc) => {
        appendItem(pc);
      });
    return data.results;
    });
};
