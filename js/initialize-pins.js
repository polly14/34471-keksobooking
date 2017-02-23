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
    var similarApartaments = [];

    var loadApartaments = function () {
      window.load('https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data', function (data) {
        similarApartaments = data;

        var threeApartaments = [];
        threeApartaments = similarApartaments.slice(0, 3);

        var fragment = document.createDocumentFragment();
        threeApartaments.forEach(function (it) {
          fragment.appendChild(window.render(it));
        });
        containerPins.appendChild(fragment);

      });
    };

    loadApartaments();

    var activatePin = function (target) {
      for (var i = 0; i < dialogOpenPins.length; i++) {
        dialogOpenPins[i].classList.remove('pin--active');
      }
      target.classList.add('pin--active');
      target.setAttribute('aria-pressed', 'true');
    };

    var onClickOpen = function (evt) {
      var target = evt.target;
      while (target !== containerPins) {
        if (target.classList.contains('pin')) {
          activatePin(target);
          window.showCard();
          return;
        }
        target = target.parentNode;
      }
    };
    var onKeyDownOpen = function (evt) {
      if (window.utils.isEnter(evt)) {
        if (evt.target.classList.contains('pin')) {
          activatePin(evt.target);
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
