'use strict';

var dialog = document.querySelector('.dialog');
var dialogCloseButton = dialog.querySelector('.dialog__close');
var containerPins = document.querySelector('.tokyo__pin-map');
var dialogOpenPins = document.querySelectorAll('.pin');

var formTitle = document.querySelector('#title');
var formPrice = document.querySelector('#price');
var formAdress = document.querySelector('#address');
var arrive = document.querySelector('#time');
var depart = document.querySelector('#timeout');
var apartType = document.querySelector('#type');
var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');

var arriveValues = ['12', '13', '14'];
var departValues = ['12', '13', '14'];
var priceArray = ['0', '1000', '10000'];
var typeArray = ['0', '1000', '10000'];
var roomNumberArray = ['1', '3', '3'];
var capacityArray = ['1', '3', '3'];

window.initializePins(dialog, dialogCloseButton, containerPins, dialogOpenPins, 'invisible', 'pin--active', 'pin');

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

