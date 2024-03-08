import { fetchAllPeople, fetchAllFilms } from "./modules/api.js";
import { renderList, renderCard } from "./modules/render.js";
import { filterList } from './modules/utils.js';

// fetch dei film e composizione delle <option> della <select>
const films = await fetchAllFilms();
const filmSelect = document.getElementById('filmSelect');
films.forEach(f => {
  const opt = document.createElement('option');
  opt.value = f.episode_number;
  opt.textContent = f.title;

  filmSelect.appendChild(opt);
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
    const list = event.target.parentElement;
    list.querySelectorAll('a').forEach(el => el.classList.remove('active'));
    event.target.classList.add('active');

    // render
    renderCard(personWithHtml);
  });

  peopleWithHtml.push(personWithHtml)
}

// set degli ascoltatori su <input> e <select> rispettivamente
let filmFilter = '';
let nameFilter = '';

filmSelect.addEventListener('change', (e) => {
  filmFilter = e.target.value;
  const filteredList = filterList(peopleWithHtml, nameFilter, filmFilter);
  renderList(filteredList.map(({ html }) => html));
})

const nameInput = document.getElementById('nameInput');
nameInput.addEventListener('keyup', (e) => {
  nameFilter = e.target.value.toLowerCase();
  const filteredList = filterList(peopleWithHtml, nameFilter, filmFilter);
  renderList(filteredList.map(el => el.html))
});

renderList(peopleWithHtml.map(({ html }) => html));
// renderCard(peopleWithHtml[0]);

