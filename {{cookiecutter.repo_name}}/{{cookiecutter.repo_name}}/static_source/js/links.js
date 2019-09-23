// make all external links target="_blank"

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

export default function linksInit() {
  $('a')
    .filter(isExternalLink)
    .each(makeExternal);

  // name navigation li's nav-link to make active
  $('.nav-link a')
    .filter(isCurrentPage)
    .each(makeActive);
}
