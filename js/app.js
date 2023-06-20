'use script';

console.log('hello');

// Global Variables

let maxNumbersOfRounds = 25;
let currentRoundsNumber = 0;

let duckArr = [];

// Dom Elements
let section = document.querySelector('section');
let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');
let button = document.querySelector('section + div');
let results = document.querySelector('ul');



// Global Constructors

function Duck(name, fileExtension ='jpeg') {
  this.name = name; // this will also be the alt text of our image
  this.src = `photos/${name}.${fileExtension}`;
  this.votes = 0;
  this.views = 0;
}

// Global Function

function selectRandomDuck() {
  return Math.floor(Math.random() * duckArr.length);
}

function renderDucks() {
  let duck1 = selectRandomDuck();
  let duck2 = selectRandomDuck();
  let duck3 = selectRandomDuck();
  while (duck1 === duck2) {
    goat2 = selectRandomDuck();
  } while (duck2 === duck3) {
    goat3 = selectRandomDuck();
  } while (duck3 === duck1) {
    goat1 = selectRandomDuck();
  }

  image1.src = duckArr[duck1].src;
  image2.src = duckArr[duck2].src;
  image3.src = duckArr[duck3].src;
  image1.alt = duckArr[duck1].name;
  image2.alt = duckArr[duck2].name;
  image3.alt = duckArr[duck3].name;
  duckArr[duck1].views++;
  duckArr[duck2].views++;
  duckArr[duck3].views++;
}

function handleDuckClick(event) {
  // console.log(event)
  currentRoundsNumber++;
  let clickDuck = event.target.alt;
  for (let i = 0; i < duckArr.length; i++) {
    if (clickDuck === duckArr[i].name) {
      duckArr[i].vote++;
      break;
    }
  }

  if (maxNumbersOfRounds === currentRoundsNumber) {
    section.removeEventListener('click', handleDuckClick);
    button.addEventListener('click', renderResults);
    button.className = 'clicks-allowed';
  } else {
    renderDucks();
  }
}

function renderResults() {
  // use UL to render the name, views and votes for each goat
  resultsContainer.innerHTML = '';
  for (let i = 0; i < duckArr.length; i++) {
    let resultItem = document.createElement('div');
    resultItem.textContent = `${duckArr[i].name} had ${duckArr[i].votes} votes and was seen ${duckArr[i].views} views.`;
    resultsContainer.appendChild(resultItem);
  }
}

let bag = new Duck('bag');
let banana = new Duck('banana');
let bathroom = new Duck('bathroom');
let boots = new Duck('boots');
let breakfast = new Duck('breakfast');
let bubblegum = new Duck('bubblegum');
let chair = new Duck('chair');
let cthulhu = new Duck('cthulhu');
let dogDuck = new Duck('dog-duck');
let dragon = new Duck('dragon');
let pen = new Duck('pen');
let petSweep = new Duck('pet-sweep');
let shark = new Duck('shark');
let sweep = new Duck('sweep','png');
let tauntaun = new Duck('tauntaun');
let unicorn = new Duck('unicorn');
let waterCan = new Duck('water-can');
let wineGlass = new Duck('wine-glass');


duckArr.push(bag,
  banana,
  bathroom,
  boots,
  breakfast,
  bubblegum,
  chair,
  cthulhu,
  dogDuck,
  dragon,
  pen,
  petSweep,
  shark,
  sweep,
  tauntaun,
  unicorn,
  waterCan,
  wineGlass);

  renderDucks();

  section.addEventListener('click', handleDuckClick);

