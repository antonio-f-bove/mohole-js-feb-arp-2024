import { fetchAllPeople, fetchAllFilms } from "./modules/api.js";
import { renderList, renderCard } from "./modules/render.js";

// fetch dei film e composizione delle <option> della <select>
const films = await fetchAllFilms();
const select = document.getElementById('filmSelect');

// for (const f of films) {
//   const opt = document.createElement('option');
//   opt.value = f.episode_number;
//   opt.textContent = f.title;
//
//   select.appendChild(opt);
// }

films.forEach(f => {
  const opt = document.createElement('option');
  opt.value = f.episode_number;
  opt.textContent = f.title;

  select.appendChild(opt);
});

// fetch dei personaggi e composizione della lista nell'<aside>
let people = await fetchAllPeople();
const peopleWithHtml = [];

for (const person of people) {
  const listItem = document.createElement('a')
  listItem.className = "list-group-item list-group-item-action";
  listItem.textContent = person.name;

  const personWithHtml = { ...person, html: listItem };

  // gestione del click su un elemento dell'<aside>
  listItem.addEventListener('click', (event) => {
    // gestione della classe .active 

    // render
    renderCard(personWithHtml);
  });

  peopleWithHtml.push(personWithHtml)
}

let filmFilter = '';
let nameFilter = '';

// creazione del ascoltatore dell'evento 'change' sulla <select>
// select.addEventListener('change', event => {
//
// });
select.addEventListener('change', function(event) {
  filmFilter = event.target.value;
  const filteredList = filterList(peopleWithHtml, nameFilter, filmFilter);
  console.log({ filteredList })
  renderList(filteredList.map(f => f.html));
});


// creazione del ascoltaore dell'evento 'keyup' sul <input>
const nameInput = document.getElementById('nameInput');
nameInput.addEventListener('keyup', (e) => {

  nameFilter = e.target.value.toLowerCase();
  // implementare il filtro dell'array
  const filteredList = filterList(peopleWithHtml, nameFilter, filmFilter); 
  console.log({filteredList})
  // chiamare renderList() con la lista filtrata
  renderList(filteredList.map(f => f.html));
});

renderList(peopleWithHtml.map(({ html }) => html));
// renderCard(peopleWithHtml[0]);


function filterList(list, nameFilter, filmFilter) {
  let filteredList = list;

  if (nameFilter != '') {
    filteredList = filteredList.filter(el => el.name.toLowerCase().includes(nameFilter));
  }

  if (filmFilter != '') {
    filteredList = filteredList.filter(el =>
      el.films.map(film => film[film.length - 2]).includes(filmFilter));
  }

  return filteredList;
}
