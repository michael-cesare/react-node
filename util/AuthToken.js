import JWT from 'jsonwebtoken';

function isEmpty(val) {
  return !!((val === undefined || val == null || val.length <= 0 || val === 'undefined' || val === '[object Object]'));
}

function userFromStorage() {
  const userStore = localStorage.getItem('user');

  return userStore && !isEmpty(userStore) && JSON.parse(userStore);
}

export function decodeJwtHeader(token) {
  // Get Token Header
  const base64Url = token.split('.')[0];
  // const base64Header = base64Url.replace('-', '+').replace('_', '/');
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  switch (base64.length % 4) {
  case 0:
    break;
  case 2:
    base64 += '==';
    break;
  case 3:
    base64 += '=';
    break;
  default:
    throw 'Illegal base64url string!';
  }

  return JSON.parse(window.atob(base64));
}

export function decodeJwtPayload(token) {
  // Get Token payload and date's
  const base64Url = token.split('.')[1];
  // const base64Header = base64Url.replace('-', '+').replace('_', '/');
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  switch (base64.length % 4) {
  case 0:
    break;
  case 2:
    base64 += '==';
    break;
  case 3:
    base64 += '=';
    break;
  default:
    throw 'Illegal base64url string!';
  }

  return JSON.parse(window.atob(base64));
}

export function isTokenExpired(token) {
  const decodedToken = decodeJwtPayload(token);
  if (decodedToken && decodedToken.exp) {
    const tokenExpiration = Math.floor(Date.now() / 1000);

    return (tokenExpiration && (decodedToken.exp - tokenExpiration) < 20);
  }

  return true;
}

export function unsetUser() {
  localStorage.setItem('user', null);
  localStorage.removeItem('user');
}

export function setUser(user) {
  localStorage.setItem('user', user);
}

export function checkIsTokenExpired() {
  const token = tokenGetter();

  return token && isTokenExpired(token);
}

export function isAuthenticated() {
  const token = tokenGetter();

  return token && !isTokenExpired(token);
}

export function loadUser() {
  return userFromStorage();
}

export function tokenGetter() {
  const user = userFromStorage();
  if (user == null) {
    return null;
  }

  const token = user && user.token;
  if (isTokenExpired(token)) {
    unsetUser();

    return null;
  }

  return token;
}
