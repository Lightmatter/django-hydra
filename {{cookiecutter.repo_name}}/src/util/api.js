import axios from 'util/axios';
import { URLS } from 'constants.js';

const getUrlByType = pageType => {
  return `${URLS.api.base}?type=${pageType}`;
};

const getUrlByPath = path => {
  return `${URLS.api.pages}find?html_path=${path}`;
};

export async function getAllPageSlugs() {
  const url = getUrlByType('wagtailapp.ContentPage');
  const res = await axios.get(url);

  return res.data.items;
}

export async function getPageBySlug(path) {
  const url = getUrlByPath(path);
  const res = await axios.get(url);

  return res.data;
}
