import './styles.scss';
import fetchCountries from './js/fetch-countries';
import markup from './js/make-markup';
import refs from './js/refs';
import debounce from 'lodash.debounce';

import Datamap from 'datamaps';

import toastr from 'toastr';
import options from './js/toastr-options';

toastr.options = options;

const map = new Datamap({ element: document.getElementById('container') });

refs.input.addEventListener('input', debounce(inputHandler, 1000));

function inputHandler() {
  let inputValue = refs.input.value;

  refs.countryCard.innerHTML = '';
  refs.countryCardList.innerHTML = '';

  refs.loader.classList.remove('is-hidden');

  fetchCountries(inputValue)
    .then(markupWithQuantity)
    .catch(error => {
      console.log(
        '%c Please, enter the country name!',
        'color: SpringGreen; font-size: 16px; font-weight: 700;',
        error,
      );

      refs.loader.classList.add('is-hidden');
      toastr.warning('Please, enter the country name!');
    });
}

function markupWithQuantity(data) {
  refs.loader.classList.add('is-hidden');

  if (data.length > 10) {
    toastr.error('Too many matches found! Please enter a more specific query!');
    return;
  }
  if (data.length <= 10 && data.length >= 2) {
    markup.makeMarkupCountryList(data);
    toastr.info('Select the required country from the list');
    refs.listItemLink.addEventListener('click', event => {
      event.preventDefault();
      const currentValue = event.target.innerText;
      const selectedCountry = data.find(({ name }) => name === currentValue);
      refs.countryCard.innerHTML = '';
      markup.makeMarkupCountryItem(selectedCountry);
    });
    return;
  }
  if (data.length === 1) {
    markup.makeMarkupCountry(data);
    toastr.success(
      'Information about the requested country was found successfully',
    );
    return;
  }
  console.log(
    '%c Please, enter the valid country name!',
    'color: SpringGreen; font-size: 16px; font-weight: 700;',
  );
  toastr.error('Please, enter the valid country name!');
}
