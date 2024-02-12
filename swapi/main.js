async function getResourceList(resource) {
    const response = await fetch(`https://swapi.dev/api/${resource}`)
    const data = await response.json()
    return data.results
}

async function getFilm(filmUrl) {
    res = await fetch(filmUrl)
    const film = await res.json()
    return {
        title: film.title,
        episode: film.episode_id,
        releaseDate: film.release_date,
    }
}

async function main() {
    const list = document.getElementById('list')
    
    // card templates (different for every resource)
    const resources = ['people', 'starships']
    const resourceButtons = resources.map(resource => document.getElementById(resource))
    resourceButtons.forEach((el,_,array) => {
        el.addEventListener('click', async (ev) => {
            // remove and add .active
            array.forEach(el => el.classList.remove('active'))
            el.classList.add('active')

            // remove page content
            list.innerHTML = ''

            switch (el.id) {
                case 'starships': displayStarships(); break;
                case 'people': displayPeople(); break;
                default: displayFallback();
            }
        })
    })
}

async function displayStarships() {
    const result = await getResourceList('starships')
    /* Questa è la *guard clause*, la clausola di guardia che effettua un *early return*
     * nel caso in cui la lista risultasse vuota: tutto il codice della funzione sotto 
     * questa clausola non verrà eseguito.
     */
    if (result.length <= 0) {
        return 
    }

    const starships = result.map(({name, model, films}) => ({name, model, films}))

    console.log({starships})

    starships.forEach(async starship => {
        // TODO: extract function
        const newEl = document.createElement('li')
        newEl.classList.add('col-6')
        newEl.innerHTML = `
<div class="card mb-3">
    <div class="card-body">
        <h5 class="card-title">${starship.name}</h5>
        <p class="card-text">${starship.model}</p>
        <div style="height: 80px;">
            <button class="btn btn-primary">Films</button> <!--  class="overflow-y-auto" -->
        </div>
    </div>
</div>
`
        newEl.querySelector('button').addEventListener('click', async (ev) => {
            const filmsDetails = []
            for (const filmUrl of starship.films) {
                const film = await getFilm(filmUrl)
                filmsDetails.push(film)
            }

            const filmList = document.createElement('ul')
            filmList.classList.add('list-group', 'h-100', 'overflow-auto')
            filmsDetails.forEach((film) => {
                const li = document.createElement('li')
                li.classList.add('list-group-item');
                li.textContent = `Episode: ${film.episode}: ${film.title}`
                filmList.append(li)
            })

            const parent = ev.target.parentElement
            parent.innerHTML = ''
            parent.append(filmList)
        })

        list.appendChild(newEl)
    });
}

main()
