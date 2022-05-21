import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import countryListMark from './countryListMark.hbs';
import countryCardMark from './countryCardMark.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info')
}
const DEBOUNCE_DELAY = 300;

function clearFields() {
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = '';
}

function resultRender(array) {
    clearFields();
    let amount = array.length;
    if (amount > 10) {
         Notify.info('Too many matches found. Please enter a more specific name');
    } else if (amount > 1 && amount <= 10) {
        refs.countryInfo.innerHTML = '';
        const countriesListMarkUp = array.map((elem) => countryListMark(elem)).join('');
        refs.countryList.innerHTML = countriesListMarkUp;
    } else if (amount === 1) {
        refs.countryList.innerHTML = '';
        const countryMarkUp = countryCardMark(array[0]);
        refs.countryInfo.innerHTML = countryMarkUp;
    }
}

function catchError() {
    Notify.failure('Oops, there is no country with that name');
    clearFields();
}

function onIputCnange(evt) {
    let value = evt.target.value.trim();
    if (value) {
        fetchCountries(value)
        .then(resultRender)
        .catch(catchError);
    }

}

refs.input.addEventListener('input', debounce(onIputCnange, DEBOUNCE_DELAY));




// function errorCatcher() {
//     Notify.failure('Oops, there is no country with that name');
// }

// function onIputCnange(evt) {
//     let value = evt.target.value.trim();
//     if (!value) {
//         refs.countryList.innerHTML = '';
//         refs.countryInfo.innerHTML = '';
//     } else {
//         fetchCountries(value)
//             .then((data) => {
//                 const countryesAmount = data.length;

//                 if (countryesAmount > 10) {
//                     Notify.info('Too many matches found. Please enter a more specific name');
//                     refs.countryList.innerHTML = '';
//                     refs.countryInfo.innerHTML = '';
//                 }

//                 if (countryesAmount > 2 && countryesAmount <= 10) {
//                     refs.countryInfo.innerHTML = '';
//                     const countriesListMarkUp = data.map((elem) => countryListMark(elem)).join('');
//                     refs.countryList.innerHTML = countriesListMarkUp;
//                 }

//                 if (countryesAmount === 1) {
//                     refs.countryList.innerHTML = '';
//                     const countryMarkUp = countryCardMark(data[0]);
//                     refs.countryInfo.innerHTML = countryMarkUp;
//                     // console.log(data)
//                 }
//             }).catch(errorCatcher());
//     }
// }