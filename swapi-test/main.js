
/*
  Fate una funzione per rispondere a ciiascuna domanda
    - fetchare della risorsa
    - manipolare il dato per arrivare alla risposta
    - inserire la risposta dentro al footer della carta
  
*/


window.addEventListener('DOMContentLoaded', () => {
  main();
});

async function main() {
  const resource = 'starships';

  const starships = await fetchAll(resource);

  console.log(starships);
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
  ).filter(starship => starship.name);
  // const starships = response.filter(s => s.name)

  return response;
}
