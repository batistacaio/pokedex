const pokeApi = {}

function convertPokeApiToPokemon(pokeDetail) {
    const pokemon = new Pokemon
    pokemon.name = pokeDetail.name
    pokemon.number = pokeDetail.order
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type
    pokemon.image = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiToPokemon)
}

pokeApi.getPokemons = (limit = 30) => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
    return fetch(url)
        .then((res) => res.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
        .catch((err) => console.log(err))
}