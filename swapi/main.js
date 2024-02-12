const list = document.getElementById('list')

let resources = [
    {
        name: 'people',
        model: ['name', 'birth_year', 'films'],
    },
    {
        name: 'starships',
        model: ['name', 'model', 'films'],
    },
]

async function main() {
    // card templates (different for every resource)
    resources = resources.map(el => ({...el, htmlButton: document.getElementById(el.name)}))
    console.log({resources})
    resources.forEach((resource,_,array) => {
        const htmlButton = resource.htmlButton
        htmlButton.addEventListener('click', async (ev) => {
            // remove and add .active
            array.forEach(({htmlButton}) => htmlButton.classList.remove('active'))
            htmlButton.classList.add('active')

            // remove page content
            list.innerHTML = ''

            displayResource(resource)
        })
    })
}

async function displayResource(resource) {
    const result = await getResourceList(resource.name)
    /* Questa è la *guard clause*, la clausola di guardia che effettua un *early return*
     * nel caso in cui la lista risultasse vuota: tutto il codice della funzione sotto 
     * questa clausola non verrà eseguito.
     */
    if (result.length <= 0) {
        return 
    }

    const resourceList = result.map(el => {
        const resourceObject = {}
        for (const field of resource.model) {
            resourceObject[field] = el[field]
        }
        return resourceObject
    })
    console.log({resourceList})

    resourceList.forEach(async el => {
        // TODO: extract function
        const newEl = document.createElement('li')
        newEl.classList.add('col-6')
        // function generateNode(el, resourceName) {
        // }
        // newEl.innerHTML = generateNode(el, resource.name)
        if (resource.name === 'starships') {
        newEl.innerHTML = `
<div class="card mb-3">
    <div class="card-body">
        <h5 class="card-title">Name: ${el.name}</h5>
        <p class="card-text">Model: ${el.model}</p>
        <div style="height: 80px;">
            <button class="btn btn-primary">Films</button> <!--  class="overflow-y-auto" -->
        </div>
    </div>
</div>
`
        } else if (resource.name === 'people') {
        newEl.innerHTML = `
<div class="card mb-3">
    <div class="card-body">
        <h5 class="card-title">Name: ${el.name}</h5>
        <p class="card-text">Birth date: ${el.birth_date}</p>
        <div style="height: 80px;">
            <button class="btn btn-primary">Films</button> <!--  class="overflow-y-auto" -->
        </div>
    </div>
</div>
`
        }
        newEl.querySelector('button').addEventListener('click', async (ev) => {
            const filmsDetails = []
            for (const filmUrl of el.films) {
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

