import axios from 'util/axios';

const API_URL = '/api/v2/';
const API_PAGES_URL = `${API_URL}pages/`;

const getUrlByType = pageType => {
  return `${API_PAGES_URL}?type=${pageType}`;
};

const getUrlByPath = path => {
  return `${API_PAGES_URL}find?html_path=${path}`;
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
