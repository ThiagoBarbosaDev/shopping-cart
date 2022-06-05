const saveCartItems = (itemData) => {
  // seu código aqui
  const data = JSON.parse(localStorage.getItem('cartItems'));
  let savedItems = [];
  if (data) {
    savedItems = [...data];
  }

  savedItems.push({ ...itemData });
  localStorage.setItem('cartItems', JSON.stringify(savedItems));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
