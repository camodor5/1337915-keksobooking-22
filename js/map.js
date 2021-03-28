import {createCardElement} from './generate-card.js'

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

const renderMap = (ads) => {
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

  const pinIcon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  ads.forEach((ad)=>{
    console.log(ad);
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
  });
}

export {deactivatePage, renderMap};

