const isEmpty = (val) => (!!((typeof val === 'undefined' || val === undefined || val == null || val === 'undefined' || val === '')));

const isNodejs = () => {
  const processDefined = typeof process !== 'undefined' && process && process.versions && process.versions.node;
  const windowDefined = typeof window !== 'undefined' && window && window !== undefined && window !== null;

  return !windowDefined && processDefined;
};

const isReactBrowser = () => {
  const processDefined = typeof process !== 'undefined' && process && process.versions && process.versions.node;
  const windowDefined = typeof window !== 'undefined' && window && window !== undefined && window !== null;

  return windowDefined && !processDefined;
};

const pad = (text, length, padChar = '0', inverse = false) => {
  let value = `${text}`;
  while (value.length < length) {
    if (inverse) {
      value = `${value}${padChar}`;
    } else {
      value = `${padChar}${value}`;
    }
  }

  return value;
};

const timezonedTime = () => {
  const date = new Date();
  const dateString = date.toLocaleString();
  // 'YYYY-MM-DD HH:mm:ss',
  // const dateString = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  return dateString;
};

const getTime = () => {
  const date = new Date();
  const year = pad(date.getFullYear(), 4, '0');
  const month = pad(date.getMonth() + 1, 2, '0');
  const day = pad(date.getDate(), 2, '0');
  const hour = pad(date.getHours(), 2, '0');
  const mm = pad(date.getMinutes(), 2, '0');
  const ss = pad(date.getSeconds(), 2, '0');

  return `${year}-${month}-${day}_${hour}:${mm}:${ss}`;
};

const getHour = () => {
  const date = new Date();
  const year = pad(date.getFullYear(), 4, '0');
  const month = pad(date.getMonth() + 1, 2, '0');
  const day = pad(date.getDate(), 2, '0');
  const hour = pad(date.getHours(), 2, '0');

  return `${year}-${month}-${day}_${hour}`;
};

const getDay = () => {
  const date = new Date();
  const year = pad(date.getFullYear(), 4, '0');
  const month = pad(date.getMonth() + 1, 2, '0');
  const day = pad(date.getDate(), 2, '0');

  return `${year}-${month}-${day}`;
};

const getMonth = () => {
  const date = new Date();
  const year = pad(date.getFullYear(), 4, '0');
  const month = pad(date.getMonth() + 1, 2, '0');

  return `${year}-${month}`;
};

const countProperties = (obj) => {
  let count = 0;

  for (const property in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, property)) {
      count++;
    }
  }

  return count;
};

/**
 * get the size of a JS object, or immutable keys/values/entries.
 * method is able to get keySeq size of immutable
 * note: Immuttable are heavy for performance, use wisely.
 * @param {object|string|array} obj a JS object of any type
 * @return {number} 0 for empty object, -1 when something went wrong, else the count of obj
 */
const sizeOf = (obj) => {
  let count = 0;
  if (!isEmpty(obj)) {
    if (obj.get && obj.toJS && obj.keySeq) {
      const immutableKeys = obj.keySeq();
      const kArray = immutableKeys && immutableKeys.toArray ? immutableKeys.toArray() : null;
      count = kArray && kArray.length ? kArray.length : -1;
    } else if (obj.size && obj !== {}) {
      count = obj.size;
    } else if (obj.length) {
      count = obj.length;
    } else {
      count = countProperties(obj);
    }
  }

  return count;
};

export {
  isNodejs,
  isReactBrowser,
  pad,
  // isObject,
  isEmpty,
  sizeOf,
  getTime,
  getHour,
  getDay,
  getMonth,
  timezonedTime,
};
