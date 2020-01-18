// source: https://github.com/github/fetch/issues/203#issuecomment-266034180

const fallbackMessage = 'Error connecting to the server!';

const parseJSON = response =>
  new Promise((resolve, reject) => {
    const contentType = response.headers.get("content-type");
    if (!contentType || contentType.indexOf('application/json') === -1) {
      resolve({
        status: response.status,
        ok: response.ok,
        json: null
      });
      return;
    }

    return response.json().then(
      json =>
        resolve({
          status: response.status,
          ok: response.ok,
          json
        }),
      () =>
        reject({
          status: response.status,
          message: fallbackMessage
        })
    );
  });

export default function request(url, options) {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(parseJSON)
      .then(
        response =>
          response.ok
            ? resolve({ status: response.status, json: response.json })
            : reject({
                status: response.status,
                message: response.json.message
              }),
        reject
      );
  });
}
