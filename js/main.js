/* global _:readonly */
import './generate-card.js';
import {deactivatePage, renderMap, renderMarkers} from './map.js';
import {getData} from './fetch-pins.js';
import {onFormSuccess, setUserFormSubmit, onFormError} from './form.js';

const RERENDER_DELAY = 500;

deactivatePage();
getData((offers) => {
  const map = renderMap();
  renderMarkers(offers, map);
  const mapFilters = document.querySelector('.map__filters');
  mapFilters.addEventListener('change', _.debounce(() => {
    renderMarkers(offers, map);
  }, RERENDER_DELAY))
});


setUserFormSubmit(onFormSuccess, onFormError);
