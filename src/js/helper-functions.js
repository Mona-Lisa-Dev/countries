import refs from './refs';

function clearCountryMarkup() {
  refs.countryCard.innerHTML = '';
  refs.countryCardList.innerHTML = '';
  refs.warningText.textContent = '';
}

function actionsOfError(error) {
  console.log(
    '%c Please, enter the country name!',
    'color: SpringGreen; font-size: 16px; font-weight: 700;',
    error,
  );
  refs.loader.classList.add('is-hidden');
}

export default {
  clearCountryMarkup,
  actionsOfError,
};
