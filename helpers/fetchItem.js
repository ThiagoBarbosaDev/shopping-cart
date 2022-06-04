// const fetch = require('node-fetch');

const fetchItem = async (id) => {
  // seu código aqui
  const url = `https://api.mercadolibre.com/items/${id}`;
  const result = fetch(url)
    .then((response) => response.json())
    .then((data) => data);
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
