const assets = {};

// source: https://stackoverflow.com/a/44325793/188740
export default function loadScript(url) {
  return new Promise((resolve, reject) => {
    if (assets[url]) {
      if (assets[url].loaded) {
        resolve(assets[url].result);
        return;
      }

      assets[url].handlers.push({ resolve, reject });
      return;
    }

    assets[url] = {
      result: null,
      loaded: false,
      handlers: [{ resolve, reject }]
    };

    const script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    script.async = true;
    script.addEventListener('error', error => {
      assets[url].handlers.forEach(handler => handler.reject(error));
      delete assets[url];
    });
    script.addEventListener('load', result => {
      assets[url].result = result;
      assets[url].loaded = true;
      assets[url].handlers.forEach(handler => handler.resolve(result));
    });
    document.head.appendChild(script);
  });
}
