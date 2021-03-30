import {getRandomInt, getRandomArbitrary} from './util.js';

const OBJECTS_AMOUNT = 10;
const apartmentTypes = ['palace', 'flat', 'house', 'bungalo'];
const timestamps = ['12:00', '13:00', '14:00'];
const options = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const imagesArr = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];


const generateAvatar = function () {
  const avatarNumber = getRandomInt (1, 8);
  return 'img/avatars/user0' + avatarNumber + '.png';
};

const generateAuthor = () => {
  return {
    avatar: generateAvatar(),
  }
}

const getRandomLengthArr = function (arr) {
  return arr.filter(function () {
    return Math.random() < 0.5;
  });
};

const generateOffer = () => {
  return {
    title: 'Уютное гнездышко',
    adress: '35.65000, 139.80000',
    price: 50000,
    type: apartmentTypes[getRandomInt(0, apartmentTypes.length - 1)],
    rooms: 5,
    guests: 12,
    checkin: timestamps[getRandomInt(timestamps.length - 1, 0)],
    checkout: timestamps[getRandomInt(timestamps.length - 1, 0)],
    features: getRandomLengthArr(options),
    description: 'Очень уютный и недорогой номер',
    photos:getRandomLengthArr(imagesArr),
  }
}

const generateLocation = () => {
  return {
    x: getRandomArbitrary(35.65000, 35.70000, 5),
    y: getRandomArbitrary(139.70000, 139.80000, 5),
  }
}


const generateObject = function () {
  return {
    'author': generateAuthor(),
    'offer': generateOffer(),
    'location': generateLocation(),
  };
};

const generateMock = function () {
  return new Array(OBJECTS_AMOUNT).fill({}).map(function () {
    return generateObject();
  })
};

export {generateMock};
