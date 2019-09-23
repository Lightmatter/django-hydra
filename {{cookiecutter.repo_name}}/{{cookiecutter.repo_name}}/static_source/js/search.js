function addToDict(dict, key, value) {
  const itemDict = dict;
  const itemKey = encodeURIComponent(decodeURIComponent(key));
  const itemValue = encodeURIComponent(decodeURIComponent(value));
  itemDict[itemKey] = itemValue;
}

export default function addParamToSearch(param, value) {
  const params = {};
  window.location.search
    .substring(1)
    .split('&')
    .forEach(querystring => {
      if (querystring) {
        const split = querystring.split('=');
        addToDict(params, split[0], split[1]);
      }
    });
  addToDict(params, param, value);
  let queryString = '';
  Object.keys(params).forEach(key => {
    const paramString = `${key}=${params[key]}`;
    const separator = queryString.indexOf('?') === -1 ? '?' : '&';
    queryString = queryString + separator + paramString;
  });
  return queryString;
}
