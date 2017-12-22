export const serializeObject = (obj) => {
  const pairs = [];

  for (const prop in obj) { // eslint-disable-line no-restricted-syntax
    if (!{}.hasOwnProperty.call(obj, prop)) {
      continue; // eslint-disable-line no-continue
    }
    pairs.push(`${prop}=${obj[prop]}`);
  }

  return pairs.join('&');
};

export const findDeep = (data, zipcode) => {
  let result = {};

  Object.keys(data).forEach((county) => {
    Object.keys(data[county]).forEach((district) => {
      if (data[county][district] === zipcode.toString()) {
        result = {
          county,
          district,
        };
      }
    });
  });

  return result;
};
