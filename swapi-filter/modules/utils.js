export function filterList(peopleWithHtml, nameFilter, filmFilter) {
  let filteredList = peopleWithHtml;
  if (nameFilter) {
    filteredList = filteredList.filter(el => el.name.toLowerCase().includes(nameFilter));
  }
  if (filmFilter) {
    /*
    el.films è un array di stringhe fatte in questo modo: "https://swapi.dev/api/films/1/"
    con l'espressione `el.films.map(f => f[f.length - 2])` andiamo a prenderci l'id del film.
    Vi ricordo che avevo dato per scontato che questi indici corrispondessero agli effettivi
    Edisodi (1 -> Episodio I) ma non è così!!!
    */
    filteredList = filteredList.filter(el => el.films.map(f => f[f.length - 2]).includes(filmFilter));
  }

  return filteredList;
}
