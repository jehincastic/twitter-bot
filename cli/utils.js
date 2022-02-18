const makeApiUrl = (path) => `/api/v1${
  path.startsWith("/")
    ? ""
    : "/"
}${path.toLowerCase()}`;

const capitialize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

module.exports = {
  makeApiUrl,
  capitialize,
};
