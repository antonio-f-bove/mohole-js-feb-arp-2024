export function renderList(htmlElements) {
  const listGroup = document.querySelector('.list-group');

  listGroup.innerHTML = '';

  for (const el of htmlElements) {
    listGroup.appendChild(el)
  }
}

export function renderCard(person) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <div class="card-body">
      <h5 class="card-title">Name: ${person.name}</h5>
      <h6 class="card-subtitle mb-2 text-body-secondary">Character</h6>
      <p class="card-text">gender: ${person.gender}</p>
      <p class="card-text">birth year: ${person.birth_year}</p>
    </div>
  `;

  const main = document.querySelector('main');
  main.innerHTML = '';
  main.appendChild(card);
}

