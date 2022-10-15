import debounce from 'lodash.debounce';

export function fetchCountries(name) {
  return fetch(`https://restcountries.com/v2/name/${name.target.value.trim()}?fields=name,capital,population,languages,flags`)
  .then(response =>
    response.json(),
  );

    console.log(name.target.value.trim());

}

