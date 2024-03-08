export function renderList(htmlElements) {
  const listGroup = document.querySelector('.list-group');

  listGroup.innerHTML = '';

  for (const el of htmlElements) {
    listGroup.appendChild(el)
  }
}

export function renderCard(person) {
}

