const pokedex = document.querySelector(".pokedex");

function fetchPokemon(pokeId) {
	const url = `https://pokeapi.co/api/v2/pokemon/${pokeId}`;
	fetch(url).then((res) => {
		return res.json();
	})
	.then((data) => {
		const pokemon = {
			name: data.name,
			id: data.id,
			image: data.sprites['front_default'],
			type: data.types.map((type) => type.type.name).join(', ')
		};
			displayPokemon(pokemon);
	});
};


function displayPokemon(pokemon) {
	const pokemonCard = `
		<li>
			<img src="${pokemon.image}"/>
			<h2>${pokemon.id}. ${pokemon.name}</h2>
			<p>${pokemon.type}</p>
		</li>
		`;
	pokedex.innerHTML = pokemonCard;
};

document.querySelector("button").addEventListener("click", () => {
	const inputValue = document.querySelector("#pokemoninput").value;
	const getId = inputValue;

	fetchPokemon(getId);
})


