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

(function () {
  window.initializePins = function () {
    var containerPins = document.querySelector('.tokyo__pin-map');
    var dialogOpenPins = document.querySelectorAll('.pin');

    var openPopup = function (target) {
      for (var i = 0; i < dialogOpenPins.length; i++) {
        dialogOpenPins[i].classList.remove('pin--active');
      }
      target.classList.add('pin--active');
      target.setAttribute('aria-pressed', 'true');
    };

    var onClickOpen = function (evt) {
      var target = evt.target;
      while (target !== window.containerPins) {
        if (target.classList.contains('pin')) {
          openPopup(target);
          window.showCard();
          return;
        }
        target = target.parentNode;
      }
    };
    var onKeyDownOpen = function (evt) {
      if (window.utils.isEnter(evt)) {
        if (evt.target.classList.contains('pin')) {
          openPopup(evt.target);
          window.showCard(function () {
            evt.target.focus();
          });
        }
      }
    };

    containerPins.addEventListener('click', onClickOpen);
    containerPins.addEventListener('keydown', onKeyDownOpen);

  };
})();
