import './css/styles.css';

import {fetchCountries} from './js/fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;


import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.init({
    width: notifySetup().width,
    position: notifySetup().position,
    distance: '10px',
    opacity: 0.7,
    clickToClose: true,
    fontSize: notifySetup().fontSize,
  });


const refInputCountry = document.querySelector('input#search-box');
const refCountriesList = document.querySelector('ul.country-list');
const refCountryInfo = document.querySelector('div.country-info');

const countrySearcher = {

    onInput(event) {
    const {onSuccess, onError} = countrySearcher;

        const querryValue = event.target.value.trim();
        if (querryValue.length === 0) {
            // console.log('empty String - no fetch');
            refCountriesList.innerHTML='';
            refCountryInfo.innerHTML='';
            return
        }

        fetchCountries(querryValue).then(onSuccess).catch(onError);
    },

    onSuccess(value) {

        if (value.length === 1) {
            const {flags: {svg}} = value[0];
            value = {...value[0], flags: svg};
            onOneCountryFound(value);
            return;
        }
    
        if (value.length >= 2 && value.length <= 10 ) {
    
            return onShortListFound(value);
            
        }
        if (value.length > 10 ) {
            return onLongListFound();
        }
    },

    onError(value) {
        return onNotFound(value);
    }

}


refInputCountry.addEventListener('input', debounce(countrySearcher.onInput, DEBOUNCE_DELAY));

function onLongListFound() {
    Notify.success('Too many matches found. Please enter a more specific name.');
    displayCountries('', '')
}

function onShortListFound(listArray) {

    const markup = listArray.map( element => 
        `<li class=list-item>
            <img src=${element.flags.svg}
            alt='Country flag picture'>
            <p class='country_name'>${element.name}</p>
        </li>`)
        .join("");

    displayCountries('', markup);
};

function onOneCountryFound(countryData) {

    const languages = countryData.languages.map(element => 
        `${element.name}`
        )
        .join(", ");

    const markup = `
    <div class='country-title'>    
    <img src=${countryData.flags}
    alt='Country flag picture'>
    
       <p class='country_name'>${countryData.name}</p>
    </div>

    <ul>
        <li class=list-item>
            <p class='country_name'><span style="font-weight:bold">Capital: </span>${countryData.capital}</p>
            </li>
            <li class=list-item>
            <p class='country_name'><span style="font-weight:bold">Population: </span>${countryData.population}</p>
            </li>
            <li class=list-item>
            <p class='country_name'><span style="font-weight:bold">languages: </span>${languages}</p>
        </li>
    </ul>`;

    displayCountries(markup, '')
};

function onNotFound(value) {
    // console.log(value);
    Notify.failure(`Oops, there is no country with that name`);
    displayCountries('', '');
};

function displayCountries(county, list) {
    refCountriesList.innerHTML=list;
    refCountryInfo.innerHTML=county;
}

function notifySetup() {
    if (window.innerWidth >= 1100) {
        return {
        position: 'center-top',
        fontSize: '18px',
        width: '400px',
        }
    };
    return {
    fontSize: '14px',
    position: 'right-top',
    width: '280px',
    };
};
