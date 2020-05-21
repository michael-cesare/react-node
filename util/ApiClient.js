import fetch from 'isomorphic-fetch';
import { Promise } from 'es6-promise';

import { tokenGetter } from './AuthToken';
import logger from './logger';

// alternative: import axios from 'axios'
// https://www.npmtrends.com/axios-vs-fetch-vs-isomorphic-fetch-vs-request-vs-superagent

const methods = ['get', 'post', 'put', 'delete'];
const acceptHeader = 'Accept';
const contentTypeHeader = 'Content-Type';
const authHeader = 'Authorization';
const contentType = 'application/json';
const FormContentType = 'application/x-www-form-urlencoded;charset=UTF-8';

const formatUrl = (path) => {
  const adjustedPath = path[0] !== '/' ? '/'.concat(path) : path;

  return adjustedPath;
};

const checkStatus = (response) => {
  if (response.status && response.status >= 200 && response.status < 300) {
    return response;
  }

  logger.log(`[ApiClient][checkStatus][Error]: ${response.statusText}`);
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

const parseJson = (response) => {
  // Only parse when there is actually content to parse
  if (response && response.statusText && response.statusText === 'No Content') {
    logger.log(`[ApiClient][parseJson][EMPTY]: response: ${JSON.stringify(response)}`);

    return '';
  }

  return response && response.text
    ? response.text().then(v => (v && v !== '' ? JSON.parse(v) : {}))
    : response;
};

const serializeParams = (obj) => {
  const str = [];

  for (const property in obj) {
    if (obj.hasOwnProperty(property)) {
      str.push(encodeURIComponent(property).concat('=', encodeURIComponent(obj[property])));
    }
  }

  return str.join('&');
};

/**
 * Summary. Wrapper for isomorphic-fetch which makes HTTP Requests
 *
 * Description. This is wrapper for isomorphic-fetch. Method available: get, post, put, delete. This methods will return a promise result, either a reject or a success.
 * 
 * @class ApiClient classname used for HTTP Requests.
 */
class ApiClient {
  /**
   * Summary. Wrapper for isomorphic-fetch which makes HTTP Requests
   * @param {string} baseUrl API Url that is used by isomorphic-fetch
  */
  constructor(baseUrl) {
    if (!baseUrl || baseUrl === '') {
      const windowUrl = window.location;
      this.baseUrl = windowUrl.protocol.concat('//', windowUrl.host);
    } else {
      this.baseUrl = baseUrl;
      this.userToken = tokenGetter();
    }

    methods.forEach((method) => {
      this[method] = (path, { params, data, options } = {}) => new Promise((resolve, reject) => {
        const adjustedPath = formatUrl(path);
        let url = this.baseUrl + adjustedPath;
        logger.debug(`[ApiClient] baseUrl:${this.baseUrl}, path:${path}, adjustedPath:${adjustedPath}, url:${url}`);

        const isGET = method === 'get' ? contentType : FormContentType;

        const init = {
          method,
          headers: {
            [acceptHeader]: contentType,
          },
        };

        if (this.userToken) {
          init.headers[authHeader] = 'Bearer '.concat(this.userToken);
        }

        if (options && options.noCors) {
          init.mode = 'no-cors';
        }

        if (params) {
          url = url.concat('?', serializeParams(params));
        }

        if (data) {
          if (data instanceof FormData || !isGET) {
            init.body = data;
            // init.headers[contentTypeHeader] = FormContentType;
          } else {
            init.body = JSON.stringify(data);
            init.headers[contentTypeHeader] = contentType;
          }
        }

        fetch(url, init)
          .then(checkStatus)
          .then(parseJson)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            if (error && error.response && error.response.statusText) {
              logger.debug(`[ApiClient][ERROR]: url ${url},  Error: ${error.response.statusText}`);
              parseJson(error.response).then((body) => {
                reject(body);
              });
            } else if (error && error.message) {
              logger.debug(`[ApiClient][ERROR]: url ${url}`);
              reject(error.message);
            } else {
              reject(error);
            }
          });
      });
    });
  }
}

export default ApiClient;
