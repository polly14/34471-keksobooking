'use strict';

window.render = (function () {
  var pinTemplate = document.querySelector('#pin-template');
  var elementToClone = pinTemplate.content.querySelector('.pin');

  return function (data) {
    var newElement = elementToClone.cloneNode(true);
    var pinAvatar = newElement.querySelector('img');
    pinAvatar.src = data.author.avatar;
    newElement.style.top = data.location.y + 'px';
    newElement.style.left = data.location.x + 'px';
    newElement.data = data;

    return newElement;
  };

})();
