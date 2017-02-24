'use strict';

(function () {
  var dialogTemplate = document.querySelector('#dialog-template');
  var dialogToClone = dialogTemplate.content.querySelector('.dialog');
  var newDialog = dialogToClone.cloneNode(true);
  var dialogTitle = newDialog.querySelector('.dialog__title');
  var dialogClose = dialogTitle.querySelector('.dialog__close');

  var tokyo = document.querySelector('.tokyo');
  var removeActivatePin = function () {
    var pinActive = document.querySelector('.pin--active');
    if (pinActive) {
      pinActive.classList.remove('pin--active');
      pinActive.setAttribute('aria-pressed', 'false');
    }
  };

  window.showCard = function (data, callback) {

    var onPopupKeydown = function (evt) {
      if (window.utils.isEscape(evt)) {
        removeActivatePin();
        newDialog.classList.add('invisible');
      }
    };

    var openPopup = function () {
      var dialogAvatar = dialogTitle.querySelector('img');
      var lodgeTitle = newDialog.querySelector('.lodge__title');
      var lodgeAdress = newDialog.querySelector('.lodge__address');
      var lodgePrice = newDialog.querySelector('.lodge__price');
      var lodgeType = newDialog.querySelector('.lodge__type');
      var lodgeRooms = newDialog.querySelector('.lodge__rooms-and-guests');
      var lodgeCheckin = newDialog.querySelector('.lodge__checkin-time');
      var lodgeFeatures = newDialog.querySelector('.lodge__features');
      var lodgeDescription = newDialog.querySelector('.lodge__description');
      var lodgePhotos = newDialog.querySelector('.lodge__photos');
      var getType = function (typeValue) {
        var type;
        switch (typeValue) {
          case 'flat': type = 'Квартира';
            break;
          case 'bungalo': type = 'Лачуга';
            break;
          case 'house': type = 'Дворец';
            break;
        }
        return type;
      };
      dialogAvatar.src = data.author.avatar;
      lodgeTitle.innerText = data.offer.title;
      lodgeAdress.innerText = data.offer.address;
      lodgePrice.innerHTML = data.offer.price + '&#x20bd;/ночь';
      lodgeType.innerText = getType(data.offer.type);
      lodgeRooms.innerText = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
      lodgeCheckin.innerText = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
      lodgeFeatures.innerHTML = '';
      lodgeDescription.innerText = data.offer.description;
      lodgePhotos.innerHTML = '';

      data.offer.features.forEach(function (item) {
        var featureItem = document.createElement('span');
        featureItem.classList.add('feature__image');
        featureItem.classList.add('feature__image--' + item);
        lodgeFeatures.appendChild(featureItem);
      });

      data.offer.photos.forEach(function (photo) {
        var image = new Image(52, 42);
        image.src = photo;
        image.style = 'padding:1px;';
        lodgePhotos.appendChild(image);
      });

      newDialog.classList.remove('invisible');
      document.addEventListener('keydown', onPopupKeydown);
      newDialog.setAttribute('aria-hidden', 'false');

      tokyo.appendChild(newDialog);

    };
    openPopup(data);

    var closePopup = function () {
      removeActivatePin();
      newDialog.classList.add('invisible');
      document.removeEventListener('keydown', onPopupKeydown);
      newDialog.setAttribute('aria-hidden', 'true');
      dialogClose.removeEventListener('click', onClick);
      dialogClose.removeEventListener('keydown', onKeyDown);

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

    return function () {
      openPopup(data);
      dialogClose.addEventListener('click', onClick);
      dialogClose.addEventListener('keydown', onKeyDown);
    };

  };
})();

