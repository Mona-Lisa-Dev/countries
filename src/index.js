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
// ==================== Datamap ==================================
const mapContainer = document.querySelector('.js-map-container');
const warningText = document.querySelector('.js-warning-text');

let mapCountryCode = '';

mapContainer.addEventListener('mouseover', event => {
  warningText.textContent = '';
  if (event.target.nodeName !== 'path') {
    return;
  }

  mapCountryCode = event.target.classList[1];
  // refs.input.value = mapCountryCode;
  // let inputValue = refs.input.value;
  // console.dir(mapCountryCode);

  const inputValue = mapCountryCode;

  refs.countryCard.innerHTML = '';
  refs.countryCardList.innerHTML = '';

  refs.loader.classList.remove('is-hidden');

  fetchCountries(inputValue)
    .then(data => data)
    .then(data => {
      const countryNameForInput =
        mapContainer.children[1].children[0].children[0].innerText;
      refs.input.value = countryNameForInput;
      console.dir(countryNameForInput);

      const countryForMarkup = data.find(
        country => mapCountryCode === country.alpha3Code,
      );
      refs.countryCard.innerHTML = '';
      refs.loader.classList.add('is-hidden');

      // if (data.length >= 2) {
      //   markup.makeMarkupCountryList(data);
      //   warningText.textContent = 'Select the required country from the list';
      //   // toastr.info('Select the required country from the list');
      //   refs.listItemLink.addEventListener('click', event => {
      //     event.preventDefault();
      //     const currentValue = event.target.innerText;
      //     const selectedCountry = data.find(
      //       ({ name }) => name === currentValue,
      //     );
      //     refs.countryCard.innerHTML = '';
      //     markup.makeMarkupCountryItem(selectedCountry);
      //   });
      //   return;
      // }

      markup.makeMarkupCountryItem(countryForMarkup);
    })
    .catch(error => {
      console.log(
        '%c Please, enter the country name!',
        'color: SpringGreen; font-size: 16px; font-weight: 700;',
        error,
      );
      refs.countryCard.innerHTML = '';
      refs.countryCardList.innerHTML = '';
      refs.loader.classList.add('is-hidden');

      warningText.textContent =
        'Sorry, we cannot find information about this country! Please try to enter the name of this country in the search field manually!!!';
      // toastr.warning(
      //   'Sorry, we cannot find information about this country! Try entering its name into the search!!',
      // );
    });
});

// ================================================================
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
