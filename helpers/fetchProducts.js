// const fetch = require('node-fetch');

const query = 'computador';
const endpointUrl = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;

const fetchProducts = async () => {
  // seu código aqui
  const result = await fetch(endpointUrl)
    .then((response) => response.json())
    .then((data) => [...data.results]);
  return result;
};

// fetchProducts().then((result) => console.log(result))

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
