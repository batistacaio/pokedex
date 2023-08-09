const pokeList = document.getElementById("pokemonList")
const loadMoreButton = document.getElementById("loadMore")
const maxRecords = 151
const limit = 5
let offset = 0

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit)
        .then((pokemons = []) => {
            const newHtml = pokemons.map((pokemon) => `
                <li class="pokemon ${pokemon.type}">
                    <div class="numberholder">
                        <span class="number">#${("000" + pokemon.number).slice(-3)}</span>
                    </div>
                    <span class="name">${pokemon.name}</span>
                    <img class="pokeball" src="./assets/img/pokeball.png">
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
                        </ol>
                        <img class="pokeimage" src="${pokemon.image}"
                    </div>
                </li>`
            ).join("")
            pokeList.innerHTML += newHtml
        })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener("click", () => {
    offset += limit
    const qtdRecord = offset + limit

    if(qtdRecord >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})