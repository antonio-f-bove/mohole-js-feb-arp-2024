import { fetchAllPeople, fetchAllFilms } from "./api.js";
import { renderList, renderCard } from "./render.js";

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

  peopleWithHtml.push(personWithHtml);
}

console.log({ peopleWithHtml })

renderList(peopleWithHtml.map(({ html }) => html));
renderCard(peopleWithHtml[0]);


const nameInput = document.getElementById('nameInput');
nameInput.addEventListener('keyup', (e) => {
  const nameFilter = e.target.value.toLowerCase();
  const filteredList = peopleWithHtml.filter(p => p.name.toLowerCase().includes(nameFilter));
  renderList(filteredList.map(el => el.html))
});

