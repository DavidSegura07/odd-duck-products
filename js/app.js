'use script';

console.log('hello');

// Global Variables

let maxNumbersOfRounds = 25;
let currentRoundsNumber = 0;

let duckArr = [];
let indexArr = [];

// Dom Elements
let section = document.querySelector('section');
let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');
let button = document.querySelector('section + div div');
let results = document.querySelector('ul');



// Global Constructors

function Duck(name, fileExtension = 'jpg') {
  this.name = name; // this will also be the alt text of our image
  this.src = `photos/${name}.${fileExtension}`;
  this.votes = 0;
  this.views = 0;
}

// Global Function

function storeDucks(duckArr) {
  let stringDuck = JSON.stringify(duckArr);
  localStorage.setItem('duck', stringDuck);
}

function getDuck() {
  let potentialDuckFromLocalStorage = localStorage.getItem('duck');
  console.log(potentialDuckFromLocalStorage);
  if (potentialDuckFromLocalStorage) {
    let parsedDuck = JSON.parse(potentialDuckFromLocalStorage);
    console.log(parsedDuck)
    //     console.log(parsedDuck[0].name)
    duckArr = parsedDuck;

  }
}

function selectRandomDuck() {
  return Math.floor(Math.random() * duckArr.length);
}

function renderDucks() {
  while (indexArr.length < 6) {
    let ranNum = selectRandomDuck();
    if (!indexArr.includes(ranNum)) {
      indexArr.push(ranNum);
    }
  }


  let duck1 = indexArr.shift();
  let duck2 = indexArr.shift();
  let duck3 = indexArr.shift();
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
      duckArr[i].votes++;
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
//Local Storage///////////////////////////////////////////////////////////
function storeDucks(duckArr) {
  let stringDuck = JSON.stringify(duckArr);
  localStorage.setItem('duck', stringDuck);
}

function getDuck() {
  let potentialDuckFromLocalStorage = localStorage.getItem('duck');
  console.log(potentialDuckFromLocalStorage);
  if (potentialDuckFromLocalStorage) {
    let parsedDuck = JSON.parse(potentialDuckFromLocalStorage);
    console.log(parsedDuck)
    //     console.log(parsedDuck[0].name)
    duckArr = parsedDuck;

  }
}

function renderResults() {
  button.removeEventListener('click', renderResults);
  // use UL to render the name, views and votes for each goat
  // for (let i = 0; i < duckArr.length; i++) {
  //   let li = document.createElement('li')
  //   li.textContent = `${duckArr[i].name} had ${duckArr[i].views} view and was voted for ${duckArr[i].votes} times.`;
  //   results.appendChild(li);
  // }
  renderList();
  renderChart();
  storeDucks(duckArr);
}

function renderList() {
  for (let i = 0; i < duckArr.length; i++) {
    let li = document.createElement('li')
    li.textContent = `${duckArr[i].name} had ${duckArr[i].views} view and was voted for ${duckArr[i].votes} times.`;
    results.appendChild(li);
  }
}

function renderChart() {
  let duckLabelsName = [];
  let duckVotes = [];
  let duckViews = [];

  for (let i = 0; i < duckArr.length; i++) {
    duckLabelsName.push(duckArr[i].name);
    duckVotes.push(duckArr[i].votes);
    duckViews.push(duckArr[i].views);
  }

  const ctx = document.getElementById('myChart');
  const config = {
    type: 'bar',
    data: {
      labels: duckLabelsName,
      datasets: [
        {
          label: '# of Votes',
          data: duckVotes,
          borderWidth: 1,
          backgroundColor: 'black',
          borderColor: 'darkyellow'
        },
        {
          label: '# of Views',
          data: duckViews,
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  }

  new Chart(ctx, config);
}

// Executable Code

// if there are products in local storage then use those products
// if there are not any products then create those products
if (localStorage.getItem('duck')) {
  // get product of local storage
  console.log('there are ducks')
  getDuck();
} else {
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
  let sweep = new Duck('sweep', 'png');
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
}


renderDucks();

section.addEventListener('click', handleDuckClick);

