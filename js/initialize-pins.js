'use strict';

window.utils = (function () {
  var ENTER_KEY_CODE = 13;
  var ESCAPE_KEY_CODE = 27;

  var isEnter = function (evt) {
    return evt.keyCode && evt.keyCode === ENTER_KEY_CODE;
  };
  var isEscape = function (evt) {
    return evt.keyCode && evt.keyCode === ESCAPE_KEY_CODE;
  };

  return {
    isEnter: isEnter,
    isEscape: isEscape
  };
})();

window.initializePins = function (popup, popupCloseButton, container, items, callback) {
  var onPopupKeydown = function (evt) {
    if (window.utils.isEscape(evt)) {
      for (var i = 0; i < items.length; i++) {
        items[i].classList.remove('pin--active');
      }
      popup.classList.add('invisible');
    }
  };

  var closePopup = function () {
    for (var i = 0; i < items.length; i++) {
      items[i].classList.remove('pin--active');
      items[i].setAttribute('aria-pressed', 'false');
    }
    popup.classList.add('invisible');
    document.removeEventListener('keydown', onPopupKeydown);
    popup.setAttribute('aria-hidden', 'true');
    popupCloseButton.removeEventListener('click', onClick);
    popupCloseButton.removeEventListener('keydown', onKeyDown);

    if (typeof callback === 'function') {
      callback();
    }

  };

  var onClick = function () {
    closePopup();
  };

  var onKeyDown = function (evt) {
    if (window.utils.isEnter(evt)) {
      closePopup();
    }
  };

  popupCloseButton.addEventListener('click', onClick);

  popupCloseButton.addEventListener('keydown', function (evt) {
    if (window.utils.isEnter(evt)) {
      closePopup();
    }
  });

};
