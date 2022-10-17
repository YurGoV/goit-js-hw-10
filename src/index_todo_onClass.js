import './css/styles.css';

import {fetchCountries} from './js/fetchCountries';
// import { useDebounce } from 'use-lodash-debounce';
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
  


  console.log(notifySetup().position, notifySetup().fontSize);

const refInputCountry = document.querySelector('input#search-box');

const countriesList = document.querySelector('ul.country-list');
console.log(countriesList);

const countryInfo = document.querySelector('div.country-info');
console.log(countryInfo);


console.log(refInputCountry);

// refInputCountry.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

// =============
// =============
class CounrySearcher {

    constructor({onLongListFound, onShortListFound, onNotFound}) {
        this.onLongListFound = onLongListFound;
        this.onShortListFound = onShortListFound;
        // this.onNotFound = onNotFound;
        // this.onSuccess = onSuccess;
    }

    onInput(event) {
        console.log(DEBOUNCE_DELAY);
        const {onSuccess, onError} = countrySearcher;

        const querryValue = event.target.value.trim();
        console.log(querryValue);
        if (querryValue.length === 0) {
            console.log('empty String - no fetch');
            countriesList.innerHTML='';
            countryInfo.innerHTML='';
            return
        }
        
        //    const test = fetchCountries(event).then(onSuccess).catch(error => console.log(error));
        fetchCountries(querryValue).then(this.onSuccess).catch(this.onError);
        
        //     Object.keys(countriesList).length;
        }//====

    onSuccess(value) {
        console.log('sss');
        console.log(value.length);

        if (value.length === 1) {
            const {flags: {svg}} = value[0];
            // console.log(name, capital, population, svg, languages);
            value = {...value[0], flags: svg};
            this.onOneCountryFound(value);
            return;
        }
    
        if (value.length >= 2 && value.length <= 10 ) {

            console.log('2 - 10 found');
    
            this.onShortListFound(value);
            return 
            
        }
        if (value.length > 10 ) {
            console.log(value);
            // console.log('more than 10 items!!!\n "Too many matches found. Please enter a more specific name."');
            // Notify.success('Too many matches found. Please enter a more specific name.');
            // countriesList.innerHTML='';
            // countryInfo.innerHTML='';
            // console.log('innerHTML init');
            // return;
            this.onLongListFound(value);
            return
        }
    
        // if (value[0] === '') {
        //     console.log(0);
        //     return;
        // }
    
        // console.log(value);
        // return;
    
        } 

        onError(value) {
            // console.log('oner');
            // // console.log(value);
            // Notify.failure(`Oops, there is no country with that name`);
            // countriesList.innerHTML='';
            // countryInfo.innerHTML='';
            // console.log(value.length);
            this.onNotFound(value);
            // return 
        }

}

const countrySearcher = new CounrySearcher({
    onLongListFound: onLongListFound,
    onShortListFound: onShortListFound,
    onNotFound: onNotFound,
});

refInputCountry.addEventListener('input', debounce(countrySearcher.onInput.bind(countrySearcher), DEBOUNCE_DELAY));






console.log(countrySearcher);

function onLongListFound() {
    Notify.success('Too many matches found. Please enter a more specific name.');
    countriesList.innerHTML='';
    countryInfo.innerHTML='';
    console.log('innerHTML init');
}

function onNotFound() {
    console.log('oner');
    // console.log(value);
    // Notify.failure(`Oops, there is no country with that name`);
    // countriesList.innerHTML='';
    // countryInfo.innerHTML='';
}


function onShortListFound(listArray) {
    
    // const ttt = Object.keys(countriesList).length
    // console.log(ttt);
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

function onOneCountryFound(countryData) {
    // const ttt = Object.keys(countriesList).length
    // console.log(ttt);
    console.log(countryData);

    const languages = countryData.languages.map(element => 
        `${element.name}`
        )
        .join(", ");

    console.log(languages);

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
    console.log(markup);
    // console.log(Object.keys(countriesList));
    countriesList.innerHTML='';
    countryInfo.innerHTML=markup;
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
