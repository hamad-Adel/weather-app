const form = document.querySelector('form');
const search = document.querySelector('input');
const errorOrSpinnerOrlocation = document.getElementById('first-msg');
const forecastInfo = document.getElementById('second-msg');




form.addEventListener('submit', (e) => {
  e.preventDefault();

  errorOrSpinnerOrlocation.textContent = 'Loading.........';
  forecastInfo.textContent = '';

  fetch(`http://localhost:3000/weather?address=${search.value}`)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        errorOrSpinnerOrlocation.textContent = data.error
      } else {
        errorOrSpinnerOrlocation.textContent = data.location
        forecastInfo.textContent = `${data.forecast.summary}. It is currently ${data.forecast.temperature} degress out. There is a ${data.forecast.precipProbability}% chance of rain`;
      }
    });

});