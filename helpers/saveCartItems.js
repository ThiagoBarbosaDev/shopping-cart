const saveCartItems = (cartData) => localStorage.setItem('cartItems', cartData);

// Primeiro esboço
// const saveCartItems = (itemData) => {
//   const data = JSON.parse(localStorage.getItem('cartItems'));
//   let savedItems = [];
//   if (data) {
//     savedItems = [...data];
//   }

//   savedItems.push({ ...itemData });
//   localStorage.setItem('cartItems', JSON.stringify(savedItems));
// };

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
