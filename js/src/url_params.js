/* esling ecmaVersion: 6 */
/* global define */
'use strict';

define([], () => (query) => {
  query = query.substring(1);

  const search = /([^&=]+)=?([^&]*)/g;
  const decode = (s) => decodeURIComponent(s.replace(/\+/g, " "));

  const params = {};
  for (;;) {
    const match = search.exec(query);
    if (!match) {
      break;
    }
    params[decode(match[1])] = decode(match[2]);
  }

  return params;
});
