function isExternalLink(link: HTMLAnchorElement) {
  const { href } = link;

  return !(
    !href
    || href.startsWith(window.location.origin)
    || href[0] === "?"
    || href[0] === "/"
    || href[0] === "#"
    || href.substring(0, 4) === "tel:"
    || href.substring(0, 7) === "mailto:"
  );
}

function isCurrentPage(link: HTMLAnchorElement) {
  const currentUrl = window.location.href;
  const currentPath = window.location.pathname;
  const { href } = link;

  return href === currentUrl || href === currentPath;
}

export default function linksInit() {
  const links = document.getElementsByTagName("a");

  Array.from(links).forEach((link) => {
    link.classList.remove("active");

    if (isExternalLink(link)) {
      link.target = "_blank"; // eslint-disable-line no-param-reassign
    }

    if (isCurrentPage(link)) {
      link.classList.add("active");
    }
  });
}

document.addEventListener("htmx:pushedIntoHistory", linksInit);
document.addEventListener("DOMContentLoaded", linksInit);
