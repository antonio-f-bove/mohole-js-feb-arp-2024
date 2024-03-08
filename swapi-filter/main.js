import { fetchAllPeople, fetchAllFilms } from "./modules/api.js";
import { renderList, renderCard } from "./modules/render.js";
import { filterList } from './modules/utils.js';

const films = await fetchAllFilms();
const filmSelect = document.getElementById('filmSelect');
films.forEach(f => {
  const opt = document.createElement('option');
  opt.value = f.episode_number;
  opt.textContent = f.title;

  filmSelect.appendChild(opt);
});

let people = await fetchAllPeople();
const peopleWithHtml = [];

for (const person of people) {
  const listItem = document.createElement('a')
  listItem.className = "list-group-item list-group-item-action";
  listItem.textContent = person.name;

  const personWithHtml = { ...person, html: listItem };

  listItem.addEventListener('click', () => {
    peopleWithHtml.forEach(p => {
      if (p.html.classList.contains('active')) {
        p.html.classList.remove('active')
      }
    });
    personWithHtml.html.classList.add('active');

    renderCard(personWithHtml);
  });

  peopleWithHtml.push(personWithHtml)
}

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
renderCard(peopleWithHtml[0]);

