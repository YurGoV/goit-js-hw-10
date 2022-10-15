import './css/styles.css';

import {fetchCountries} from './js/fetchCountries';
// import { useDebounce } from 'use-lodash-debounce';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 1000;

const refInputCountry = document.querySelector('input#search-box');


console.log(refInputCountry);

refInputCountry.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));



function onInput(event) {
   const test = fetchCountries(event).then(onSuccess, onError);
//    console.log(test);
}

function onSuccess(value) {
    if (value.length === 1) {
        const {name, capital, population, flags, languages} = value[0];
        console.log(name, capital, population, flags.svg, languages);
        return;
    }

    if (value.length >= 2 && value.length <= 10 ) {
        value.map((element) =>{
        console.log(element.flags.svg, element.name);
        
    })
    if (value.length === 1 && value[0] === '') {
        console.log(0);
        return;
    }
    return;
    }

    console.log('more than 10 items!!!');
    console.log(value);
}

function onError(value) {
    console.log('oner');
    console.log(value);
    console.log(value.length);
}

