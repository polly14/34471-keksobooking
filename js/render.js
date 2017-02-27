'use strict';

window.renderPin = (function () {
  var pinTemplate = document.querySelector('#pin-template');
  var pinToClone = pinTemplate.content.querySelector('.pin');

  return function (data) {
    var newPin = pinToClone.cloneNode(true);
    var pinAvatar = newPin.querySelector('img');
    pinAvatar.src = data.author.avatar;
    newPin.style.top = data.location.y + 'px';
    newPin.style.left = data.location.x + 'px';
    newPin.data = data;
    return newPin;
  };
})();
