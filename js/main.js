import './data.js';
import './generate-card.js';
import {deactivatePage, renderMap} from './map.js';
import {getData} from './fetch-pins.js';
import {onFormSuccess, setUserFormSubmit, onFormError} from './form.js';

const OFFERS_COUNT = 10;

deactivatePage();
getData((offers) => {
  renderMap(offers.slice(0, OFFERS_COUNT));
});


setUserFormSubmit(onFormSuccess, onFormError);
