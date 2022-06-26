'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// ///////////////////////////////////////

const renderCountry = function (data, className = '') {
  const language = Object.values(data.languages)[0];

  const currency = Object.values(data.currencies)[0].name;
  // console.log(currency);
  const html = `
  <article class="country ${className} ">
  <img class="country__img" src="${data.flags.png}" />
  <div class="country__data">
  <h3 class="country__name">${data.name.common}</h3>
  <h4 class="country__region">${data.region}</h4>
  <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(
    1
  )} million people</p>
    <p class="country__row"><span>🗣️</span>${language}</p>
    <p class="country__row"><span>💰</span>${currency}</p>
    </div>
    </article>
    `;

  countriesContainer.insertAdjacentHTML('beforeend', html);

  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

// // const countries = function (name) {
// //   const request = new XMLHttpRequest();
// //   request.open('GET', `https://restcountries.com/v3.1/name/${name}`);

/ /; //   request.send();

// //   request.addEventListener('load', function () {
// //     // console.log(this.responseText);

// //     const [data] = JSON.parse(this.responseText);
// //     // console.log(data);

// //     // console.log(data.languages);
// //     // console.log(data.flags);

// //     //display country1

// //     renderCountry(data);

// //     //get country2
// //     const neighbours = data.borders;
// //     // console.log(neighbours);

// //     if (!neighbours) return;

// //     //AJAX call 2

// //     neighbours.forEach(neighbour => {
// //       const request2 = new XMLHttpRequest();

// //       request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);

// //       request2.send();

// //       request2.addEventListener('load', function () {
// //         const [data2] = JSON.parse(this.responseText);
// //         // console.log(data2);

// //         renderCountry(data2, 'neighbour');
// //       });
// //     });

// //     // console.log(request2.send());
// //   });
// // };

// // countries('kenya');
// // countries('argentina');
// // countries('iraq');
// // countries('rwanda');

// const getJSON = function (url, errorMsg = 'Something went wrong') {
//   return fetch(url).then(response => {
//     if (response.ok === false) {
//       throw new Error(`Country not found ${response.status}`);
//     }
//     return response.json();
//   });
// };

// const getCountryData = function (country) {
//   getJSON(`https://restcountries.com/v3.1/name/${country}`, 'country not found')
//     .then(data => {
//       renderCountry(data[0]);
//       console.log(data[0]);
//       const neighbors = data[0].borders;

//       console.log(neighbors);

//       if (!neighbors) throw new Error('No neighbor found');

//       //neighbours

//       return neighbors;
//     })
//     .then(neighbors => {
//       neighbors.forEach(neighbor => {
//         getJSON(
//           `https://restcountries.com/v3.1/alpha/${neighbor}`,
//           'country not found'
//         ).then(data => {
//           renderCountry(data[0], 'neighbour');
//         });
//       });
//     })
//     .catch(error => renderError(`something is wrong bro ${error}`))
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// // btn.addEventListener('click', () => getCountryData('australia'));

// //CHALLENGE 1

// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(response => {
//       console.log(response);
//       if (!response.ok) {
//         throw new Error(`Problem with geocoding ${response.status}`);
//       }

//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`you are in ${data.city}, ${data.country}`);
//       // console.log(data.country);
//       return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
//       renderCountry(data[0]);
//     })
//     .catch(error => console.log(`${error}---------`));
// };

// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

//BUILDING A PROMISE

// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('lottery draw is happening-----');
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve('You win bro');
//     } else {
//       reject(new Error('You lost bro'));
//     }
//   }, 2000);
// });

// lotteryPromise
//   .then(resolve => console.log(resolve))
//   .catch(error => console.error(error));

// //PROMISFYING setTimeout

// Promise.resolve('aabc').then(res => console.log(res));

// Promise.reject(new Error('aabc'))
//   .then(res => console.log(res))
//   .catch(err => console.log(err));

// console.log('getting position');

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   error => reject(error)
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getPosition().then(pos => console.log(pos));

const whereAmI = function (lat, lng) {
  getPosition()
    .then(pos => {
      console.log(pos.coords);
      const { latitude: lat, longitude: lng } = pos.coords;
      // console.log(lat, lng);

      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Problem with geocoding ${response.status}`);
      }
      // console.log(response.json());

      return response.json();
    })
    .then(data => {
      // console.log(data);
      console.log(`you are in ${data.city}, ${data.country}`);
      // console.log(data.country);
      return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      renderCountry(data[0]);
    })
    .catch(error => console.log(`${error}---------`));
};

// btn.addEventListener('click', whereAmI());

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
  });
};
