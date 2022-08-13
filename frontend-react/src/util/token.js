export function decodeToken(token) {
  if (!token) {
    return;
  }
  const _decodeToken = (token) => {
    try {
      return JSON.parse(atob(token));
    } catch {
      return;
    }
  };
  return token
    .split(".")
    .map((token) => _decodeToken(token))
    .reduce((acc, curr) => {
      if (!!curr) acc = { ...acc, ...curr };
      return acc;
    }, Object.create(null));
}

export function isTokenValid(input) {
  if (!input) {
    return false;
  }
  const exp = typeof input === "string" ? decodeToken(input)["exp"] : input;
  return !!exp ? Math.floor(Date.now() / 1000) < exp : false;
}
