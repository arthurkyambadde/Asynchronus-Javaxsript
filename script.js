'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

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

// const countries = function (name) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${name}`);

//   request.send();

//   request.addEventListener('load', function () {
//     // console.log(this.responseText);

//     const [data] = JSON.parse(this.responseText);
//     // console.log(data);

//     // console.log(data.languages);
//     // console.log(data.flags);

//     //display country1

//     renderCountry(data);

//     //get country2
//     const neighbours = data.borders;
//     // console.log(neighbours);

//     if (!neighbours) return;

//     //AJAX call 2

//     neighbours.forEach(neighbour => {
//       const request2 = new XMLHttpRequest();

//       request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);

//       request2.send();

//       request2.addEventListener('load', function () {
//         const [data2] = JSON.parse(this.responseText);
//         // console.log(data2);

//         renderCountry(data2, 'neighbour');
//       });
//     });

//     // console.log(request2.send());
//   });
// };

// countries('kenya');
// countries('argentina');
// countries('iraq');
// countries('rwanda');

const getCountryData = function (country) {
  const request2 = fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(
      response => response.json()
      // error => alert(error)
    )
    .then(data => {
      renderCountry(data[0]);
      console.log(data[0]);
      const neighbors = data[0].borders;

      console.log(neighbors);

      if (!neighbors) return;

      //neighbours
      return neighbors;
    })
    .then(neighbors => {
      neighbors.forEach(neighbor => {
        const neighborRequest = fetch(
          `https://restcountries.com/v3.1/alpha/${neighbor}`
        )
          .then(
            response => response.json()
            // error => alert(error)
          )
          .then(data => {
            renderCountry(data[0], 'neighbour');
          });
      });
    })
    .catch(error => renderError(`something is wrong bro ${error}`))
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', () => getCountryData('qagfhb'));
