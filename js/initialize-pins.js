'use strict';

window.utils = (function () {

  var ENTER_KEY_CODE = 13;
  var ESCAPE_KEY_CODE = 27;

  var isEnter = function (evt) {
    return evt.keyCode && evt.keyCode === ENTER_KEY_CODE;
  };

  var initializePins = function (popup, popupCloseButton, container, items) {

    var onPopupKeydown = function (evt) {
      if (evt.keyCode === ESCAPE_KEY_CODE) {
        popup.classList.add('invisible');
      }
    };

    function openPopup(target) {
      for (var i = 0; i < items.length; i++) {
        items[i].classList.remove('pin--active');
      }
      target.classList.add('pin--active');
      popup.classList.remove('invisible');
      document.addEventListener('keydown', onPopupKeydown);
      target.setAttribute('aria-pressed', 'true');
      popup.setAttribute('aria-hidden', 'false');
    }

    function closePopup() {
      for (var i = 0; i < items.length; i++) {
        items[i].classList.remove('pin--active');
        items[i].setAttribute('aria-pressed', 'false');
      }
      popup.classList.add('invisible');
      document.removeEventListener('keydown', onPopupKeydown);
      popup.setAttribute('aria-hidden', 'true');
    }

    popupCloseButton.addEventListener('click', closePopup);

    popupCloseButton.addEventListener('keydown', function (evt) {
      if (window.utils.isEnter(evt)) {
        closePopup();
      }
    });

    container.addEventListener('click', function (evt) {
      var target = evt.target;
      while (target !== container) {
        if (target.classList.contains('pin')) {
          openPopup(target);
          return;
        }
        target = target.parentNode;
      }
    });

    container.addEventListener('keydown', function (evt) {
      if (window.utils.isEnter(evt)) {
        if (evt.target.classList.contains('pin')) {
          openPopup(evt.target);
        }
      }
    });
  };

  return {
    isEnter: isEnter,
    initializePins: initializePins
  };

})();

