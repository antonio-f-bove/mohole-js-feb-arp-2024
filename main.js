
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

            </div>
        </div>

    const list = document.getElementById('list')
    displayList.forEach(el => {
        list.append(el)
    });


    // displayStarships(starships)
}

main()