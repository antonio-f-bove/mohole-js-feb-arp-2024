import { injectAnswer, fetchAll } from "./utils.js";

export async function solveQuestion1() {
  const starships = await fetchAll('starships');
  const speeds = starships
    .map(({ MGLT, name }) => ({ speed: parseInt(MGLT), name }))
    .filter(s => !isNaN(s.speed))
    .sort((a, b) => b.speed - a.speed);
  // console.log({ speeds });

  const maxStarship = speeds[0];
  injectAnswer(`${maxStarship.name}'s speed: ${maxStarship.speed} MGLT`, 1);
}

export async function solveQuestion2() {
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

export async function solveQuestion3() {
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

export async function solveQuestion4() {
  let people = await fetchAll('people');
  people = people
    .filter(p => p.birth_year != 'unknown')
    .map(({ name, birth_year }) => ({ name, birth_year: birth_year.slice(0, -3) }))
    .sort((a, b) => b.birth_year - a.birth_year);

  const eldest = people[0];
  injectAnswer(`${eldest.name}, born in ${eldest.birth_year}BBY`, 4);
}

export async function solveQuestion5() {
  const species = await fetchAll('species');
  const spcsHeights = species
    .map(s => parseInt(s.average_height))
    .filter(h => !isNaN(h));
  const avgHeight = spcsHeights.reduce((sum, curr) => sum + curr, 0) / spcsHeights.length;

  injectAnswer(`${Math.trunc(avgHeight * 100) / 100} cm`, 5);
}

export async function solveQuestion6() {
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

