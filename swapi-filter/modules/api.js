// export async function fetchAllPeople() {
//   let people = [];
//   let url = 'http://swapi.dev/api/people/';
//
//   while (url) {
//     const resp = await fetch(url);
//     const { results, next } = await resp.json();
//     people = people.concat(results);
//     url = next;
//   }
//
//   return people;
// }

export async function fetchAllPeople() {
  const resp = await fetch('../data/people.json');
  return await resp.json();
}


export async function fetchAllFilms() {
  const resp = await fetch('../data/films.json');
  return await resp.json();
}
