export default {
  search: q => `https://api.github.com/search/repositories?q=${q}&sort=starts`,
};
