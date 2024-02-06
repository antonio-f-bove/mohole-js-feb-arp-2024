/*

- fetch di tutte le starship da swapi
- display nella lista
    - name
    - model
    - films (questa è una lista)

*/

async function getStarships() {
    const response = await fetch('https://swapi.dev/api/starships')
    const data = await response.json()
    return data.results
}

function displayStarships(starships) {

    // for (const s of starships) {
    //     const newEl = document.createElement('li')
    //     const name = document.createTextNode('name: ' + s.name)
    //     const model = document.createTextNode(' | model: '+s.model)
    //     newEl.appendChild(name)
    //     newEl.appendChild(model)
    //     list.appendChild(newEl)
    // }


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

    const displayList = starships.map(el => `
    <div class="container">
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${el.name}</h5>
                <p class="card-text">${el.model}</p>
                <a href="#" class="card-link">Card link</a>
                <a href="#" class="card-link">Another link</a>
            </div>
        </div>
    </div>
    `)

    const list = document.getElementById('list')
    displayList.forEach(el => {
        list.append(el)
    });


    // displayStarships(starships)
}

main()