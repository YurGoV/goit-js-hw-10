// import debounce from 'lodash.debounce';

export function fetchCountries(counryName) {
  return fetch(`https://restcountries.com/v2/name/${counryName}?fields=name,capital,population,languages,flags`)
  .then(response => 
    {
    
    if (!response.ok) {
      throw new Error(response.status);
    }
  
    return response.json()
});
}

