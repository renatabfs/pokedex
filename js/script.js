const pokemonName = document.querySelector('.pokemon-name');
const pokemonID = document.querySelector('.pokemon-id');
const pokemonImage = document.querySelector('.pokemon-image');

const form = document.querySelector('.form');
const input = document.querySelector('.input-search');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1

const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    if (APIResponse.status == 200) {
    const data = await APIResponse.json()
    return data;
    }
}

const renderPokemon = async (pokemon) =>{
    pokemonName.innerHTML = 'Carregando...'
    pokemonID.innerHTML = ''
    const data = await fetchPokemon(pokemon);
    if (data) {
    searchPokemon = data.id;
    pokemonName.innerHTML = data.name;
    pokemonID.innerHTML = data.id;
    pokemonImage.style.display ='block';
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
}else {
    pokemonName.innerHTML = 'Not Found :('
    pokemonID.innerHTML = '';
    pokemonImage.style.display ='none';
}
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase())
})

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon)
    }
})

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon)
})

renderPokemon(searchPokemon)
