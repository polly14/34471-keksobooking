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

  container.addEventListener('click', function (evt) {
    var target = evt.target;
    while (target !== container) {
      if (target.classList.contains('pin')) {
        openPopup(target);
        window.initializePins(popup, window.dialogCloseButton, container, items);
        return;
      }
      target = target.parentNode;
    }
  });

  container.addEventListener('keydown', function (evt) {
    if (window.utils.isEnter(evt)) {
      if (evt.target.classList.contains('pin')) {
        openPopup(evt.target);
        window.initializePins(popup, window.dialogCloseButton, container, items, function () {
          evt.target.focus();
        });
      }
    }
  });

};
