const getSavedCartItems = (callback) => {
  // seu código aqui

  const cartOl = document.querySelector('.cart__items');
  const data = JSON.parse(localStorage.getItem('cartItems'));
    if (data) {
      data.forEach((itemData) => {
      const newCartLi = callback(itemData);
      cartOl.appendChild(newCartLi);
    });
  }
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
