import { fetchAllPeople, fetchAllFilms } from "./modules/api.js";
import { renderList, renderCard } from "./modules/render.js";

// fetch dei film e composizione delle <option> della <select>
const films = await fetchAllFilms();

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


// creazione del ascoltaore dell'evento 'keyup' sul <input>
const nameInput = document.getElementById('nameInput');
nameInput.addEventListener('keyup', (e) => {
  nameFilter = e.target.value.toLowerCase();
  // implementare il filtro dell'array
  // chiamare renderList() con la lista filtrata
});

renderList(peopleWithHtml.map(({ html }) => html));
// renderCard(peopleWithHtml[0]);

