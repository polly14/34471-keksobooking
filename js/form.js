'use strict';

window.pinsAndDialog = (function () {

  var dialog = document.querySelector('.dialog');
  var dialogCloseButton = dialog.querySelector('.dialog__close');
  var containerPins = document.querySelector('.tokyo__pin-map');
  var dialogOpenPins = document.querySelectorAll('.pin');

  window.utils.initializePins(dialog, dialogCloseButton, containerPins, dialogOpenPins);

})();

window.formFields = (function () {

  var formTitle = document.querySelector('#title');
  var formPrice = document.querySelector('#price');
  var formAdress = document.querySelector('#address');
  var arrive = document.querySelector('#time');
  var depart = document.querySelector('#timeout');
  var apartType = document.querySelector('#type');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  var arriveValues = ['После 12', 'После 13', 'После 14'];
  var departValues = ['Выезд до 12', 'Выезд до 13', 'Выезд до 14'];
  var priceArray = ['0', '1000', '10000'];
  var typeArray = ['Лачуга', 'Квартира', 'Дворец'];
  var roomNumberArray = ['1 комната', '2 комнаты', '100 комнат'];
  var capacityArray = ['не для гостей', 'для 3 гостей', 'для 3 гостей'];

  formTitle.minLength = 30;
  formTitle.maxLength = 100;
  formTitle.required = true;
  formPrice.required = true;
  formPrice.max = 1000000;
  formPrice.min = 1000;
  formAdress.required = true;

  window.synchronizeFields(arrive, depart, arriveValues, departValues, 'value');

  window.synchronizeFields(apartType, formPrice, typeArray, priceArray, 'min');

  window.synchronizeFields(roomNumber, capacity, roomNumberArray, capacityArray, 'value');

})();

