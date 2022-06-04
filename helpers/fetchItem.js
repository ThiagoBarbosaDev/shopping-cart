// const fetch = require('node-fetch');

const fetchItem = async (id = 0) => {
  // seu código aqui
  try { 
  if (!id) { throw new Error('You must provide an url'); }
  const url = `https://api.mercadolibre.com/items/${id}`;
  const result = fetch(url)
    .then((response) => response.json())
    .then((data) => data);
  return result;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
