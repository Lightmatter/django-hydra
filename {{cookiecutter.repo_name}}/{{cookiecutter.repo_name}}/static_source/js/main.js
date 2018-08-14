var $ = require('jquery');
import 'foundation-sites/dist/js/foundation.min.js';
(function() {
  function _makeExternal() {
    this.target = '_blank';
  }
  function _makeActive(){
    $(this).addClass('active');
  }
  function _isExternalLink() {
    var href = $(this).attr('href');
    return !(!href ||
             href[0] === '?' ||
             href[0] === '/' ||
             href[0] === '#' ||
             href.substring(0, 4) === 'tel:' ||
             href.substring(0, 7) === 'mailto:' ||
             href.substring(0, 11) === 'javascript:');
  }

  function _isCurrentPage(){
    var current_url = window.location.pathname;
    var href = $(this).attr('href');
    return (href == current_url);
  }

  function init() {
    $('a').filter(_isExternalLink).each(_makeExternal);
    $('.nav-link a').filter(_isCurrentPage).each(_makeActive);
  }

  $(init);
})();

$(document).ready(function($) {

  $(document).foundation();
})



function addToDict(dict, key, value) {
  key = encodeURIComponent(decodeURIComponent(key));
  value = encodeURIComponent(decodeURIComponent(value));
  dict[key] = value;
}

function addParamToSearch(param, value) {
  var params = {};
  location.search.substring(1).split('&').forEach(function(querystring) {
    if (querystring) {
      var split = querystring.split('=');
      addToDict(params, split[0], split[1]);
    }
  });
  addToDict(params, param, value);
  var queryString = '';
  for (var key in params) {
    var paramString = key + '=' + params[key];
    var separator = (queryString.indexOf('?') === -1) ? '?' : '&';
    queryString = queryString + separator + paramString;
  }
  return queryString;
}
addParamToSearch('', '')
