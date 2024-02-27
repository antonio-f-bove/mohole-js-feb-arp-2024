
/*
  Fate una funzione per rispondere a ciiascuna domanda
    - fetchare della risorsa
    - manipolare il dato per arrivare alla risposta
    - inserire la risposta dentro al footer della carta
  
*/


window.addEventListener('DOMContentLoaded', () => {
  main();
});

function main() {
  const qFunctions = {
    1: solveQuestion1,
    2: solveQuestion2,
    3: solveQuestion3,
    4: solveQuestion4,
    5: solveQuestion5,
    6: solveQuestion6,
  };

  Object.keys(qFunctions).forEach((qId) => {
    // console.log({ qId })
    const card = document.querySelector(`#card-id-${qId}`);
    const button = card.querySelector('a');
    button.addEventListener('click', async (ev) => {
      const b = ev.target;
      b.classList.add('disabled');
      b.innerHTML = `
        <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
        <span class="visually-hidden" role="status">Loading...</span>
      `;
      await qFunctions[qId]();
      b.innerHTML = 'Done!';
      b.classList.add('btn-success')
    });
  });
}

async function solveQuestion1() {
  const starships = await fetchAll('starships');
  const speeds = starships
    .map(({ MGLT, name }) => ({ speed: parseInt(MGLT), name }))
    .filter(s => !isNaN(s.speed))
    .sort((a, b) => b.speed - a.speed);
  // console.log({ speeds });

  const maxStarship = speeds[0];
  injectAnswer(`${maxStarship.name}'s speed: ${maxStarship.speed} MGLT`, 1);
}

async function solveQuestion2() {
  let starships = await fetchAll('starships');
  starships = starships.map(s => ({
    name: s.name,
    totCapacity: parseInt(s.crew.replace(',', '')) + parseInt(s.passengers.replace(',', ''))
  }))
  starships = starships.filter(s => !isNaN(s.totCapacity))
  // console.log({starships})

  let maxStarship = starships[0];
  for (const starship of starships) {
    if (starship.totCapacity > maxStarship.totCapacity) {
      maxStarship = starship;
    }
  }
  console.log({ maxStarship })

  injectAnswer(`${maxStarship.name}'s capacity: ${maxStarship.totCapacity}`, 2);
}

async function solveQuestion3() {
  let people = await fetchAll('people');
  people = people
    .map(({ name, films }) => ({ name, filmNum: films.length }))
    .filter(p => p.name)
    .sort((a, b) => b.filmNum - a.filmNum);

  const maxFilms = people[0].filmNum
  const maxPeople = people.filter(p => p.filmNum === maxFilms)
  console.log({ maxPeople });

  injectAnswer(maxPeople.map(p => p.name).join(', ') + ` (${maxFilms} films)`, 3);
}

async function solveQuestion4() {
  let people = await fetchAll('people');
  people = people
    .filter(p => p.birth_year != 'unknown')
    .map(({ name, birth_year }) => ({ name, birth_year: birth_year.slice(0, -3) }))
    .sort((a, b) => b.birth_year - a.birth_year);

  const eldest = people[0];
  injectAnswer(`${eldest.name}, born in ${eldest.birth_year}BBY`, 4);
}

async function solveQuestion5() {
  const species = await fetchAll('species');
  const spcsHeights = species
    .map(s => parseInt(s.average_height))
    .filter(h => !isNaN(h));
  const avgHeight = spcsHeights.reduce((sum, curr) => sum + curr, 0) / spcsHeights.length;

  injectAnswer(`${Math.trunc(avgHeight * 100) / 100} cm`, 5);
}

async function solveQuestion6() {
  let planets = await fetchAll('planets');
  planets = planets
    .map(({ name, diameter, population, surface_water }) => ({
      name,
      surface: 4 * Math.PI * (diameter / 2) ** 2, // 4πr^2
      population: parseInt(population),
      surface_water: surface_water != 'unknown' ? parseInt(surface_water) : 0,
    }))
    .filter(p => !isNaN(p.population) && p.surface != 0 && !isNaN(p.surface))

  const planets_w_densities = planets
    .map(p => ({
      ...p,
      density: Math.trunc(p.population / (p.surface - p.surface * p.surface_water / 100))
    }))
    .filter(p => isFinite(p.density)) // escludiamo i 2 pianeti acquatici che secondo questo modello (imperfetto) hanno densità infinita
    .sort((a, b) => b.density - a.density);
  console.log({ planets_w_densities })
  const most_densely_populated = planets_w_densities[0];

  injectAnswer(`${most_densely_populated.name} with a density of ${most_densely_populated.density} pp/k^2`, 6);
}

async function fetchAll(resource) {
  const res = await fetch(`https://swapi.dev/api/${resource}/`);
  const json = await res.json();
  const count = json.count;

  const promises = [];
  for (let i = 1; i <= count; i++) {
    promises.push(fetch(`https://swapi.dev/api/${resource}/${i}/`));
  }
  const response = (await Promise.all(
    promises
      .map(p => p.then(r => r.json())))
  ).filter(el => el.name);

  return response;
}

function injectAnswer(answer, questionNumber) {
  const cardEl = document.getElementById(`card-id-${questionNumber}`)
  const buttonEl = cardEl.querySelector('a')
  const answerEl = cardEl.querySelector('em')

  // buttonEl.addEventListener('click', () => {
  answerEl.innerHTML = answer
  // answerEl.classList.add('bg-success')
  // })
}
