function convertPokemonToLi(pokemon) {
    return `
    <li class="pokemon">
        <span class="number">#001</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
            <ol class="types">
                <li class="type">Grass</li>
                <li class="type">Poison</li>
            </ol>
            <img src="https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/1.svg" 
            alt="${pokemon.name}">
        </div>
    </li>
    `
}

const pokeList = document.getElementById("pokemonList")

pokeApi.getPokemons()
    .then((pokemons = []) => {
        pokeList.innerHTML += pokemons.map(convertPokemonToLi).join("")
    })