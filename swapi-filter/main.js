async function fetchAllPeople() {
  let people = [];
  let url = 'http://swapi.dev/api/people/';

  while (url) {
    const resp = await fetch(url);
    const { results, next } = await resp.json();
    people = people.concat(results);
    url = next;
  }

  return people;
}

function renderList(elements) {
  const listGroup = document.querySelector('.list-group');

  for (const el of elements) {
    listGroup.appendChild(el)
  }
}









let people = await fetchAllPeople();
const peopleWithHtml = [];

for (const person of people) {
  const listItem = document.createElement('a')
  listItem.className = "list-group-item list-group-item-action";
  listItem.textContent = person.name;

  const personWithHtml = { ...person, html: listItem };
  listItem.addEventListener('click', () => renderCard(personWithHtml));

  peopleWithHtml.push(personWithHtml);
}

console.log({peopleWithHtml})

renderList(peopleWithHtml.map(({ html }) => html));
renderCard(peopleWithHtml[0]);

