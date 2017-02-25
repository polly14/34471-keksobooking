'use strict';

window.initializePins = (function () {
  var containerPins = document.querySelector('.tokyo__pin-map');
  var similarApartaments = [];

  var loadApartaments = function () {
    window.load('https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data', function (data) {
      similarApartaments = data;

      var threeApartaments = [];
      threeApartaments = similarApartaments.slice(0, 3);

      var fragment = document.createDocumentFragment();
      threeApartaments.forEach(function (it) {
        fragment.appendChild(window.renderPin(it));
      });
      containerPins.appendChild(fragment);
    });
  };
  loadApartaments();

  var activatePin = function (target) {
    target.classList.add('pin--active');
    target.setAttribute('aria-pressed', 'true');
  };
  var removeActivatePin = function () {
    var pinActive = document.querySelector('.pin--active');
    if (pinActive) {
      pinActive.classList.remove('pin--active');
      pinActive.setAttribute('aria-pressed', 'false');
    }
  };

  var onClickOpen = function (evt) {
    var target = evt.target;
    while (target !== containerPins) {
      if (target.classList.contains('pin')) {
        removeActivatePin();
        activatePin(target);
        window.showCard(target.data, removeActivatePin);
        return;
      }
      target = target.parentNode;
    }
  };
  var onKeyDownOpen = function (evt) {
    if (window.utils.isEnter(evt)) {
      if (evt.target.classList.contains('pin')) {
        removeActivatePin();
        activatePin(evt.target);
        window.showCard(evt.target.data, function () {
          evt.target.focus();
          removeActivatePin();
        });
      }
    }
  };

  containerPins.addEventListener('click', onClickOpen);
  containerPins.addEventListener('keydown', onKeyDownOpen);

})();

