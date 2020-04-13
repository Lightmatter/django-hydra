const $ = require('jquery');

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i += 1) {
      const cookie = $.trim(cookies[i]);
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === `${name}=`) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
const csrftoken = getCookie('csrftoken');

function csrfSafeMethod(method) {
  // these HTTP methods do not require CSRF protection
  return /^(GET|HEAD|OPTIONS|TRACE)$/.test(method);
}
// $.ajaxSetup({
//   crossDomain: false, // obviates need for sameOrigin test
//   beforeSend: (xhr, settings) => {
//     if (!csrfSafeMethod(settings.type)) {
//       xhr.setRequestHeader('X-CSRFToken', csrftoken);
//     }
//   },
// });
