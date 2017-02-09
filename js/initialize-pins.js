'use strict';

var ENTER_KEY_CODE = 13;
var ESCAPE_KEY_CODE = 27;

window.isEnter = function (evt) {
  return evt.keyCode && evt.keyCode === ENTER_KEY_CODE;
};

window.initializePins = function (popup, popupCloseButton, container, items, cssInvisible, cssItemActive, cssItem) {

  var onPopupKeydown = function (evt) {
    if (evt.keyCode === ESCAPE_KEY_CODE) {
      popup.classList.add(cssInvisible);
    }
  };

  function openPopup(target) {
    for (var i = 0; i < items.length; i++) {
      items[i].classList.remove(cssItemActive);
    }
    target.classList.add(cssItemActive);
    popup.classList.remove(cssInvisible);
    document.addEventListener('keydown', onPopupKeydown);
    target.setAttribute('aria-pressed', 'true');
    popup.setAttribute('aria-hidden', 'false');
  }

  function closePopup() {
    for (var i = 0; i < items.length; i++) {
      items[i].classList.remove(cssItemActive);
      items[i].setAttribute('aria-pressed', 'false');
    }
    popup.classList.add(cssInvisible);
    document.removeEventListener('keydown', onPopupKeydown);
    popup.setAttribute('aria-hidden', 'true');
  }

  popupCloseButton.addEventListener('click', closePopup);

  popupCloseButton.addEventListener('keydown', function (evt) {
    if (window.isEnter(evt)) {
      closePopup();
    }
  });

  container.addEventListener('click', function (evt) {
    var target = evt.target;
    while (target !== container) {
      if (target.classList.contains(cssItem)) {
        openPopup(target);
        return;
      }
      target = target.parentNode;
    }
  });

  container.addEventListener('keydown', function (evt) {
    if (window.isEnter(evt)) {
      if (evt.target.classList.contains(cssItem)) {
        openPopup(evt.target);
      }
    }
  });
};
