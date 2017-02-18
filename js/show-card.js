'use strict';

var dialog = document.querySelector('.dialog');
var dialogCloseButton = dialog.querySelector('.dialog__close');
var dialogOpenPins = document.querySelectorAll('.pin');

(function () {
  window.showCard = function (callback) {

    var onPopupKeydown = function (evt) {
      if (window.utils.isEscape(evt)) {
        for (var i = 0; i < dialogOpenPins.length; i++) {
          dialogOpenPins[i].classList.remove('pin--active');
        }
        dialog.classList.add('invisible');
      }
    };

    var openPopup = function () {
      dialog.classList.remove('invisible');
      document.addEventListener('keydown', onPopupKeydown);
      dialog.setAttribute('aria-hidden', 'false');
    };
    openPopup();

    var closePopup = function () {
      for (var i = 0; i < dialogOpenPins.length; i++) {
        dialogOpenPins[i].classList.remove('pin--active');
        dialogOpenPins[i].setAttribute('aria-pressed', 'false');
      }
      dialog.classList.add('invisible');
      document.removeEventListener('keydown', onPopupKeydown);
      dialog.setAttribute('aria-hidden', 'true');
      dialogCloseButton.removeEventListener('click', onClick);
      dialogCloseButton.removeEventListener('keydown', onKeyDown);

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

    dialogCloseButton.addEventListener('click', onClick);
    dialogCloseButton.addEventListener('keydown', onKeyDown);

  };
})();
