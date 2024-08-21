import Cookies from 'js-cookie';

export async function csrfFetch(url, options = {}) {
  options.headers = options.headers ?? {};
  options.method = options.method ?? 'GET';
  if (options.method.toUpperCase() !== 'GET') {
    options.headers['Content-Type'] =
      options.headers['Content-Type'] ?? 'application/json';
    options.headers['XSRF-TOKEN'] = Cookies.get('XSRF-TOKEN');
  }

  const res = await window.fetch(url, options);

  if (res.status >= 400) throw res;
  else return res;
}
