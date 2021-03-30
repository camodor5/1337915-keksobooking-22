import {createCardElement} from './generate-card.js'

const OFFERS_COUNT = 10;
const form = document.querySelector('.ad-form');
const formFieldsets = form.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFieldsets = mapFilters.querySelectorAll('fieldset');
const mapSelects = document.querySelectorAll('.map__filter');

const deactivatePage = () => {
  form.classList.add('ad-form--disabled');
  formFieldsets.forEach((formFieldset) => {
    formFieldset.setAttribute('disabled', 'disabled');
  })
  mapFilters.classList.add('map__filters--disabled');
  mapFieldsets.forEach((mapFieldset) => {
    mapFieldset.setAttribute('disabled', 'disabled');
  })
  mapSelects.forEach((mapSelect) => {
    mapSelect.setAttribute('disabled', 'disabled');
  })
}

const activatePage = () => {
  form.classList.remove('ad-form--disabled');
  formFieldsets.forEach((formFieldset) => {
    formFieldset.removeAttribute('disabled');
  })
  mapFilters.classList.remove('map__filters--disabled');
  mapFieldsets.forEach((mapFieldset) => {
    mapFieldset.removeAttribute('disabled');
  })
  mapSelects.forEach((mapSelect) => {
    mapSelect.removeAttribute('disabled');
  })
}

const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');
const featuresFilters = document.querySelector('#housing-features');

const housingTypeFilter = (arrElement) => {
  if (housingType.value === arrElement.offer.type || housingType.value === 'any') {
    return true;
  }
}

const housingPriceFilter = (arrElement) => {
  switch (housingPrice.value) {
    case 'any':
      return true;
    case 'low':
      return arrElement.offer.price < 10000;
    case 'middle':
      return arrElement.offer.price >= 10000 && arrElement.offer.price <= 50000;
    case 'high':
      return arrElement.offer.price > 50000;
  }
}

const housingRoomsFilter = (arrElement) => {
  switch (housingRooms.value) {
    case 'any':
      return true;
    case '1':
      return arrElement.offer.rooms === 1;
    case '2':
      return arrElement.offer.rooms === 2;
    case '3':
      return arrElement.offer.rooms === 3;
  }
}

const housingGuestsFilter = (arrElement) => {
  switch (housingGuests.value) {
    case 'any':
      return true;
    case '2':
      return arrElement.offer.guests === 2;
    case '1':
      return arrElement.offer.guests === 1;
    case '0':
      return arrElement.offer.guests === 0;
  }
}

const houseFeaturesFilter = (array) => {
  const checkedFeaturesCollection = featuresFilters.querySelectorAll('input:checked');
  let checkedFeatures = [...checkedFeaturesCollection];
  return checkedFeatures.every((checkedFeature) => {
    return array.offer.features.includes(checkedFeature.value)
  })
}

const applyFilters = (array) => {
  return array.filter(housingTypeFilter).filter(housingPriceFilter).filter(housingRoomsFilter).filter(housingGuestsFilter).filter(houseFeaturesFilter);
}

const renderMarkers = (ads, map) => {
  let L = window.L;
  const pinIcon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const filteredArr = applyFilters(ads);

  filteredArr.slice(0, OFFERS_COUNT).forEach((ad)=>{
    const marker = L.marker({
      lat: ad.location.lat,
      lng: ad.location.lng,
    },
    {
      icon: pinIcon,
    },
    )
    marker
      .addTo(map)
      .bindPopup(
        createCardElement(ad),
      );

    mapFilters.addEventListener('change', () => {
      map.removeLayer(marker);
    })
  });
}

const renderMap = () => {
  let L = window.L;

  const map = L.map('map-canvas')
    .on('load', () => {
      activatePage();
    })
    .setView({
      lat: 35.68261,
      lng: 139.75717,
    }, 12);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const mainPinIcon = L.icon({
    iconUrl: '../img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const mainPin = L.marker(
    {
      lat: 35.68261,
      lng: 139.75717,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  mainPin.addTo(map);

  mainPin.on('moveend', (evt) => {
    const getLatLng = evt.target.getLatLng();
    const getLat = getLatLng.lat.toFixed(5);
    const getLng = getLatLng.lng.toFixed(5);
    const address = document.querySelector('#address');
    const value = getLat + ' ,' + getLng;
    address.setAttribute('value', value);
    address.setAttribute('readonly', 'true');
  });
  return map;
}

export {deactivatePage, renderMap, renderMarkers}

//Отправлен на проверку
