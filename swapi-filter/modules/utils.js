export function filterList(peopleWithHtml, nameFilter, filmFilter) {
  let filteredList = peopleWithHtml;
  if (nameFilter) {
    filteredList = filteredList.filter(el => el.name.toLowerCase().includes(nameFilter));
  }
  if (filmFilter) {
    filteredList = filteredList.filter(el => el.films.map(f => f[f.length - 2]).includes(filmFilter));
  }

  return filteredList;
}
