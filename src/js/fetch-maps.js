import fetchCountries from './fetch-countries';
import markup from './make-markup';
import refs from './refs';
import helperFunction from './helper-functions';

function overMapHandler(event) {
  let mapCountryCode = '';
  refs.warningText.textContent = '';

  if (event.target.nodeName !== 'path') {
    return;
  }

  mapCountryCode = event.target.classList[1];
  const inputValue = mapCountryCode;

  helperFunction.clearCountryMarkup();

  refs.loader.classList.remove('is-hidden');

  fetchCountries(inputValue)
    .then(data => {
      const countryNameForInput =
        refs.mapContainer.children[1].children[0].children[0].innerText;
      refs.input.value = countryNameForInput;
      // console.dir(countryNameForInput);

      const countryForMarkup = data.find(
        country => mapCountryCode === country.alpha3Code,
      );
      helperFunction.clearCountryMarkup();
      console.log(countryForMarkup);

      refs.loader.classList.add('is-hidden');

      markup.makeMarkupCountryItem(countryForMarkup);
    })
    .catch(error => {
      helperFunction.actionsOfError(error);

      helperFunction.clearCountryMarkup();

      refs.warningText.textContent =
        'Sorry, we cannot find information about this country! Please try to enter the name of this country in the search field manually!!!';
    });
}

export default overMapHandler;
