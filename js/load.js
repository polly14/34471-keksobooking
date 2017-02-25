'use strict';

window.load = (function () {

  var errorHandler = function (err) {
    return err;
  };

  return function (url, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    if (typeof onError === 'function') {
      errorHandler = onError;
    }

    xhr.addEventListener('load', function (evt) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          onLoad(evt.target.response);
        } else {
          errorHandler('Failed to load data. Server returned status: ' + evt.target.status);
        }
      }
    });

    xhr.addEventListener('error', errorHandler);
    xhr.addEventListener('timeout', errorHandler);

    xhr.responseType = 'json';

    xhr.open('GET', url);
    xhr.send();
  };
})();

