// import debounce from 'lodash.debounce';

export function fetchCountries(name) {
  return fetch(`https://restcountries.com/v2/name/${name.target.value.trim()}?fields=name,capital,population,languages,flags`)
  .then(response => 
    {
    
    // if (!response.ok) {
    //   throw new Error(response.status);
    // }
  
    return response.json()
}
);

    console.log(name.target.value.trim());

}

