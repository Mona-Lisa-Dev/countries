import fetchCountries from './fetch-countries';
import markup from './make-markup';
import refs from './refs';
import helperFunction from './helper-functions';

import countriesCode from '../countries.json';

function overMapHandler(event) {
  let mapCountryCode = '';
  let countryForSearch = '';

  refs.warningText.classList.add('is-hidden');

  if (event.target.nodeName !== 'path') {
    return;
  }

  mapCountryCode = event.target.classList[1];
  countriesCode.map(el => {
    if (mapCountryCode === el.code) {
      countryForSearch = el.name.split(',')[0];
    }
  });

  // console.log('countryForSearch', countryForSearch);

  helperFunction.clearCountryMarkup();

  refs.loader.classList.remove('is-hidden');

  fetchCountries(countryForSearch)
    .then(data => {
      refs.input.value = countryForSearch;

      const countryForMarkup = data.find(
        country => mapCountryCode === country.alpha3Code,
      );
      helperFunction.clearCountryMarkup();
      // console.log(countryForMarkup);

      refs.loader.classList.add('is-hidden');

      markup.makeMarkupCountryItem(countryForMarkup);
    })
    .catch(error => {
      helperFunction.actionsOfError(error);
      helperFunction.clearCountryMarkup();
      refs.warningText.classList.remove('is-hidden');
    });
}

export default overMapHandler;
