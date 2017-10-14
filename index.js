const Nightmare = require('nightmare');
const moment = require('moment'); // comment

const nightmare = Nightmare({ show: true });

const departureCity = 'paris';
const arrivalCity = 'athens';
const departureDate = '20171016';
const arrivalDate = '20171023';


nightmare
.goto('https://www.airfrance.fr/')
.type('#minibe__od--out', departureCity)
.click('#ac__list--minibe__od--out li:nth-child(1)')
.wait(1000)
.type('#minibe__od--in', arrivalCity)
.click('#ac__list--minibe__od--in li:nth-child(1)')
.wait(1000)
.click('#calendar--' + departureDate)
.wait(1000)
.click('#calendar--' + arrivalDate)
.wait(1000)
.click('#minibe__button--search')
.wait(15000)
.evaluate(() => {
  const outPriceEl = document
  .querySelector('#idCalendarOutbound li.flight__calendar__list__item.selected .calendar__price')
  .innerText;

  const inPriceEl = document
  .querySelector('#idCalendarInbound li.flight__calendar__list__item.selected .calendar__price')
  .innerText;

  const outPriceString = outPriceEl.replace(' €', '');
  const outPrice = parseInt(outPriceString, 10);

  const inPriceString = inPriceEl.replace(' €', '');
  const inPrice = parseInt(inPriceString, 10);

  return {
    inPrice,
    outPrice,
  };
})
.end()
.then(result => console.log(result))
.catch(err => console.log(err));