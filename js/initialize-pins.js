'use strict';

window.initializePins = (function () {
  var containerPins = document.querySelector('.tokyo__pin-map');
  var similarApartaments = [];
  var tokyoFilters = document.querySelector('.tokyo__filters');
  var filterType = tokyoFilters.querySelector('#housing_type');
  var filterPrice = tokyoFilters.querySelector('#housing_price');
  var filterRooms = tokyoFilters.querySelector('#housing_room-number');
  var filterGuests = tokyoFilters.querySelector('#housing_guests-number');
  var filterFeatures = tokyoFilters.querySelectorAll('input[type=checkbox]');
  var ANY = 'any';
  var MIDDLE = 'middle';
  var LOW = 'low';
  var HIGH = 'high';
  var MIN_MIDDLE_PRICE = '10000';
  var MAX_MIDDLE_PRICE = '50000';

  var rangeType = function (data) {
    return (filterType.value === ANY) || (filterType.value === data.offer.type);
  };

  var rangePrice = function (item) {
    switch (filterPrice.value) {
      case MIDDLE:
        return item.offer.price >= MIN_MIDDLE_PRICE && item.offer.price <= MAX_MIDDLE_PRICE;
      case LOW:
        return item.offer.price < MIN_MIDDLE_PRICE;
      case HIGH:
        return item.offer.price > MAX_MIDDLE_PRICE;
    }
    return false;
  };

  var rangeRooms = function (data) {
    return (filterRooms.value === ANY) || (data.offer.rooms === Number(filterRooms.value));
  };

  var rangeGuests = function (data) {
    return (filterGuests.value === ANY) || (data.offer.guests === Number(filterGuests.value));
  };

  var rangeFeatures = function (data) {
    var getFeatureChecked = function (feature) {
      return feature.checked;
    };

    var getFeatureValue = function (feature) {
      return feature.value;
    };

    var checkedFeatures = [].filter.call(filterFeatures, getFeatureChecked).map(getFeatureValue);

    var checkFeature = function (feature) {
      return data.offer.features.indexOf(feature) !== -1;
    };

    return (checkedFeatures.length === 0) || (checkedFeatures.every(checkFeature));
  };

  var filterData = function (item) {
    return rangeType(item) &&
      rangePrice(item) &&
      rangeRooms(item) &&
      rangeGuests(item) &&
      rangeFeatures(item);
  };

  var removePins = function () {
    window.showCard.closePopup();
    var pins = containerPins.querySelectorAll('.pin');

    pins.forEach(function (item) {
      if (!item.classList.contains('pin__main')) {
        containerPins.removeChild(item);
      }
    });
  };

  tokyoFilters.addEventListener('change', function () {
    removePins();
    renderPins(similarApartaments.filter(filterData));
  });

  var renderPins = function (array) {
    var fragment = document.createDocumentFragment();

    array.forEach(function (it) {
      fragment.appendChild(window.renderPin(it));
    });

    containerPins.appendChild(fragment);
  };

  var loadApartaments = function () {
    window.load('https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data', function (data) {
      similarApartaments = data;
      var threeApartaments = [];
      threeApartaments = similarApartaments.slice(0, 3);
      renderPins(threeApartaments);
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
      if ((target.classList.contains('pin')) &&
          (!target.classList.contains('pin__main'))) {
        removeActivatePin();
        activatePin(target);
        window.showCard.showCard(target.data, removeActivatePin);
        return;
      }
      target = target.parentNode;
    }
  };

  var onKeyDownOpen = function (evt) {
    if ((window.utils.isEnter(evt)) &&
        (evt.target.classList.contains('pin')) &&
        (!evt.target.classList.contains('pin__main'))) {
      removeActivatePin();
      activatePin(evt.target);
      window.showCard.showCard(evt.target.data, function () {
        evt.target.focus();
        removeActivatePin();
      });
    }
  };

  containerPins.addEventListener('click', onClickOpen);
  containerPins.addEventListener('keydown', onKeyDownOpen);
})();
