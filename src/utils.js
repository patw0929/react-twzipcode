const serializeObject = (obj) => {
  const pairs = [];
  for (const prop in obj) {
    if (!{}.hasOwnProperty.call(obj, prop)) {
      continue;
    }
    pairs.push(`${prop}=${obj[prop]}`);
  }
  return pairs.join('&');
};

export { serializeObject };
