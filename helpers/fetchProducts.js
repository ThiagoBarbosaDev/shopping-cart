// const fetch = require('node-fetch');

const isParamEmpty = (param) => {
  if (!param) {
    throw new Error('You must provide an url');
  }
};

const fetchProducts = async (query) => {
  // seu código aqui
  const endpointUrl = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  try {
    isParamEmpty(query);
    const result = await fetch(endpointUrl)
      .then((response) => response.json())
      .then((data) => data);
    return result;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
