document.addEventListener("DOMContentLoaded", () => {
  fetchPokemonList();
});

async function fetchPokemonList() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
    const data = await response.json();
    displayPokemonList(data.results);
  } catch (error) {
    console.error("Error fetching Pokémon list:", error);
  }
}

function displayPokemonList(pokemonList) {
  const listContainer = document.getElementById("pokemonList");
  listContainer.innerHTML = "";

  pokemonList.forEach((pokemon) => {
    const listItem = document.createElement("li");
    listItem.textContent = pokemon.name;
    listItem.addEventListener("click", () => showPokemonDetails(pokemon.name));
    listContainer.appendChild(listItem);
  });
}

async function searchPokemon() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase();

    if (searchTerm.trim() === '') {
        // If the search input is empty, fetch the default list
        fetchPokemonList();
        return;
    }
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${searchTerm}`
    );
    const data = await response.json();

    // Display the search result
    displayPokemonList([data]);

    // Display detailed information
    showPokemonDetails(data.name);
  } catch (error) {
    console.error("Error searching for Pokémon:", error);
  }
}

async function showPokemonDetails(pokemonName) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    const data = await response.json();

    const detailsContainer = document.getElementById("pokemonDetails");
    detailsContainer.innerHTML = `
        <div class="center">
<div class="article-card">
<div class="content">
<p class="date">${data.name}</p>
<p class="title">Height: ${data.height}</p>
<p class="title">${data.weight}</p>     <p class="title">${data.abilities
      .map((ability) => ability.ability.name)
      .join(", ")}</p>    
</div>
<img src="${data.sprites.front_default}" alt="${data.name}">
</div>
</div>`;
  } catch (error) {
    console.error("Error fetching Pokémon details:", error);
  }
}
