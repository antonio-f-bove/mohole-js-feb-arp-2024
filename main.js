
async function getStarships() {
    const response = await fetch('https://swapi.dev/api/starships')
    const data = await response.json()
    return data.results
}

}



async function main() {
    const result = await getStarships()
    if (result.length <= 0) {
        return 
    }

    const starships = result.map(el => ({
        name: el.name,
        model: el.model,
        films: el.films
    }))

    console.log(result, starships)

    const list = document.getElementById('list')
    starships.forEach(async starship => {
        const newEl = document.createElement('li')
        newEl.classList.add('col-6')
        newEl.innerHTML = `
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">${starship.name}</h5>
                    <p class="card-text">${starship.model}</p>
                    <button href="#" class="btn btn-primary">Films</button>
                </div>
            </div>

    const list = document.getElementById('list')
    displayList.forEach(el => {
        list.append(el)
        list.appendChild(newEl)
    });


    // displayStarships(starships)
}

main()
