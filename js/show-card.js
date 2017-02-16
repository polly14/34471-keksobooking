'use strict';

window.showCard = function (popup, container, items) {

  var onPopupKeydown = function (evt) {
    if (window.utils.isEscape(evt)) {
      for (var i = 0; i < items.length; i++) {
        items[i].classList.remove('pin--active');
      }
      popup.classList.add('invisible');
    }
  };

  var openPopup = function (target) {
    for (var i = 0; i < items.length; i++) {
      items[i].classList.remove('pin--active');
    }
    target.classList.add('pin--active');
    popup.classList.remove('invisible');
    document.addEventListener('keydown', onPopupKeydown);
    target.setAttribute('aria-pressed', 'true');
    popup.setAttribute('aria-hidden', 'false');
  };

  window.containerPins.addEventListener('click', function (evt) {
    var target = evt.target;
    while (target !== window.containerPins) {
      if (target.classList.contains('pin')) {
        openPopup(target);
        window.initializePins(window.dialog, window.dialogCloseButton, window.containerPins, window.dialogOpenPins);
        return;
      }
      target = target.parentNode;
    }
  });

  window.containerPins.addEventListener('keydown', function (evt) {
    if (window.utils.isEnter(evt)) {
      if (evt.target.classList.contains('pin')) {
        openPopup(evt.target);
        window.initializePins(window.dialog, window.dialogCloseButton, window.containerPins, window.dialogOpenPins, function () {
          evt.target.focus();
        });
      }
    }
  });

};
