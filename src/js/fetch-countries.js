function fetchCountries(searchQuery) {
  const url = `https://restcountries.eu/rest/v2/name/${searchQuery}`;

  return (
    fetch(url)
      // .then(res => console.log(`${res.status}`, !!res.status))
      .then(res => res.json())
  );
}

export default fetchCountries;
