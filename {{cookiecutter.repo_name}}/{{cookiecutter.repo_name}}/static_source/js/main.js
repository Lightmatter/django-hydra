import 'foundation-sites/dist/js/foundation.min';
import './csrf.js';
const $ = require('jquery');

(() => {
  function makeExternal() {
    this.target = '_blank';
  }
  function makeActive() {
    $(this).addClass('active');
  }

  function isExternalLink() {
    const href = $(this).attr('href');
    return !(
      !href ||
      href[0] === '?' ||
      href[0] === '/' ||
      href[0] === '#' ||
      href.substring(0, 4) === 'tel:' ||
      href.substring(0, 7) === 'mailto:'
    );
  }

  function isCurrentPage() {
    const currentUrl = window.location.pathname;
    const href = $(this).attr('href');
    return href === currentUrl;
  }

  function init() {
    $('a')
      .filter(isExternalLink)
      .each(makeExternal);
    $('.nav-link a')
      .filter(isCurrentPage)
      .each(makeActive);
  }

  $(init);
  $(document).ready(() => {
    $(document).foundation();
  });
})();

function addToDict(dict, key, value) {
  const itemDict = dict;
  const itemKey = encodeURIComponent(decodeURIComponent(key));
  const itemValue = encodeURIComponent(decodeURIComponent(value));
  itemDict[itemKey] = itemValue;
}

function addParamToSearch(param, value) {
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
addParamToSearch('', '');
