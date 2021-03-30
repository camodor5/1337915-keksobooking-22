const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const createCardElement = (object) => {
  const cardElement = cardTemplate.cloneNode(true);
  const popupTitle = cardElement.querySelector('.popup__title');
  popupTitle.textContent = object.offer.title;

  const popupPrice = cardElement.querySelector('.popup__text--price');
  popupPrice.textContent = object.offer.price + ' ₽/ночь';

  const houseType = cardElement.querySelector('.popup__type');
  if (object.offer.type === 'flat') {
    houseType.textContent = 'Квартира';
  } else if (object.offer.type === 'bungalo') {
    houseType.textContent = 'Бунгало';
  } else if (object.offer.type === 'palace') {
    houseType.textContent = 'Дворец';
  } else {
    houseType.textContent = 'Дом';
  }

  const popupCapacity = cardElement.querySelector('.popup__text--capacity');
  popupCapacity.textContent = object.offer.rooms + ' комнаты для ' + object.offer.guests + ' гостей';

  const popupTime = cardElement.querySelector('.popup__text--time');
  popupTime.textContent = 'Заезд после ' + object.offer.checkin + ', выезд до '+ object.offer.checkout;

  const featureTypes = object.offer.features;
  const featureItems = cardElement.querySelectorAll('.popup__feature');
  featureItems.forEach(function (featureItem) {
    featureItem.style.display = 'none';
  });
  featureTypes.forEach(function (featureType) {
    featureType = cardElement.querySelector('.popup__feature--' + featureType);
    featureType.style.display = 'block';
  });
  const popupDescription = cardElement.querySelector('.popup__description');
  popupDescription.textContent = object.offer.description;
  const popupPhotos = cardElement.querySelector('.popup__photos');
  const srcPhotos = object.offer.photos;
  const image = popupPhotos.querySelector('.popup__photo');
  if (srcPhotos.length === 1) {
    image.src = srcPhotos[0];
  } else if (srcPhotos.length > 1) {
    image.src = srcPhotos[0];
    for (let j = 1; j < srcPhotos.length; j++) {
      const imageElement = document.createElement('img');
      imageElement.classList.add('popup__photo');
      imageElement.src = srcPhotos[j];
      imageElement.width = 45;
      imageElement.height = 40;
      popupPhotos.appendChild(imageElement);
    }
    const avatar = cardElement.querySelector('.popup__avatar');
    avatar.src = object.author.avatar;

  }
  return cardElement;
}

export {createCardElement};
