import countriesTpl from '../templates/countries.hbs';
import countryListTpl from '../templates/countries-list.hbs';
import countryItemTpl from '../templates/country-item.hbs';

import refs from './refs';

function makeMarkupCountry(country) {
  const markup = countriesTpl(country);
  refs.countryCard.insertAdjacentHTML('beforeend', markup);
}

function makeMarkupCountryItem(country) {
  if (country === undefined) {
    refs.warningText.classList.remove('is-hidden');
    return;
  }
  const markup = countryItemTpl(country);
  refs.countryCard.insertAdjacentHTML('beforeend', markup);
}

function makeMarkupCountryList(country) {
  const markup = countryListTpl(country);
  refs.countryCardList.insertAdjacentHTML('beforeend', markup);
}

export default {
  makeMarkupCountry,
  makeMarkupCountryList,
  makeMarkupCountryItem,
};
