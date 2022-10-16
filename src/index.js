import './css/styles.css';

import {fetchCountries} from './js/fetchCountries';
// import { useDebounce } from 'use-lodash-debounce';
import debounce from 'lodash.debounce';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.init({
    width: '350px',
    position: 'center-top',
    distance: '10px',
    opacity: 0.7,
    clickToClose: true,
    fontSize: '28px',
  });

// Notify.success('Sol lucet omnibus');
// Notify.failure('Qui timide rogat docet negare');


const DEBOUNCE_DELAY = 1000;

const refInputCountry = document.querySelector('input#search-box');

const countriesList = document.querySelector('ul.country-list');
console.log(countriesList);

const countryInfo = document.querySelector('div.country-info');
console.log(countryInfo);


console.log(refInputCountry);

refInputCountry.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));



function onInput(event) {
const querryValue = event.target.value.trim();
console.log(querryValue);
if (querryValue.length === 0) {
    console.log('empty String - no fetch');
    return
}
//    const test = fetchCountries(event).then(onSuccess).catch(error => console.log(error));
const test = fetchCountries(querryValue).then(onSuccess).catch(onError);
//    const test2 = Object.keys(countriesList).length;
//    console.log(test);
}

function onSuccess(value) {
    // console.log(`value is ${value}`);
    if (value.length === 1) {
        const {flags: {svg}} = value[0];
        // console.log(name, capital, population, svg, languages);
        value = {...value[0], flags: svg};
        displayCountryData(value);
        return;
    }

    if (value.length >= 2 && value.length <= 10 ) {

        return displayCountriesList(value);
        
    }
    if (value.length > 10 ) {
        console.log(value);

        // console.log('more than 10 items!!!\n "Too many matches found. Please enter a more specific name."');
        Notify.success('Too many matches found. Please enter a more specific name.');
        countriesList.innerHTML='';
        countryInfo.innerHTML='';
        console.log('innerHTML init');
        // console.log(test2);
        // if (listIsEmpty) {
        // console.log('innerHTML init');
        // console.log(listIsEmpty);
        // countriesList.innerHTML='';
        // }
        return;
    }

    if (value[0] === '') {
        console.log(0);
        return;
    }

    console.log(value);
    return;

}

function onError(value) {
    console.log('oner');
    // console.log(value);
    Notify.failure(`Oops, there is no country with that name ${value}`);
    // console.log(value.length);
}

function displayCountriesList(listArray) {
    console.log(listArray);
    const markup = listArray.map( element => 
        `<li class=list-item>
            <img src=${element.flags.svg}
            alt='Country flag picture'>
            <p class='country_name'>${element.name}</p>
        </li>`)
        .join("");

    console.log(markup);
    countriesList.innerHTML=markup;
    countryInfo.innerHTML='';
    // listIsEmpty = false;
    
};

function displayCountryData(countryData) {
    console.log(countryData);

    const languages = countryData.languages.map(element => 
        `${element.name}`
    )
    .join(", ");

    console.log(languages);

    const markup = 
    `
    <div class='country_title'>
    
    <img src=${countryData.flags}
    alt='Country flag picture'>
    
       <p class='country_name'>${countryData.name}</p>
    </div>

    <ul>
    <li class=list-item>
    <p class='country_name'>Capital: ${countryData.capital}</p>
    </li>
    <li class=list-item>
    <p class='country_name'>Population: ${countryData.population}</p>
    </li>
    <li class=list-item>
    <p class='country_name'>languages: ${languages}</p>
    </li>
    </ul>`

    console.log(markup);
    countryInfo.innerHTML=markup;
    countriesList.innerHTML='';

}
