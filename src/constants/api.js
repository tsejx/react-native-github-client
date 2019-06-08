export default {
  search: q => `https://api.github.com/search/repositories?q=${q}&sort=starts`,
  trending: (params) => `https://github.com/trending/${params.key}?${params.text}`
};
