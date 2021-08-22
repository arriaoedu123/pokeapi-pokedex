const pokedex = document.querySelector(".pokedex");

function fetchPokemon(pokeId) {
	const url = `https://pokeapi.co/api/v2/pokemon/${pokeId}`;
	fetch(url).then((res) => {
		return res.json();

	})
	.then((data) => {
		console.log(data);
		const pokemon = {
			name: data.name,
			id: data.id,
			image: data.sprites['front_default'],
			info: data.height + ", " + data.weight,
			abilities: data.abilities.map((abilities) => abilities.ability.name).join(', '),
			type: data.types.map((type) => type.type.name).join(', '),
			stats: data.stats.map((stats) => stats.stat.name + ": " + stats.base_stat).join(', ')
			//moves: data.moves.map((moves) => moves.move.name).join(', ')
		};
		displayPokemon(pokemon);
	}).catch((data) => {
		alert("this pokemon does not exists");
	});
};

function displayPokemon(pokemon) {
	const pokemonCard = `
		<li>
			<img src="${pokemon.image}"/>
			<h2>${pokemon.id}. ${pokemon.name}</h2>
			<p>${pokemon.info}</p>
			<p>${pokemon.type}</p>
			<p>${pokemon.abilities}</p>
			<p>${pokemon.stats}</p>
		</li>
		`;
	pokedex.innerHTML = pokemonCard;
};

document.querySelector("button").addEventListener("click", () => {
	const inputValue = document.querySelector("#pokemoninput").value;
	const lowerValue = inputValue.toLowerCase();
	const getId = lowerValue;

	fetchPokemon(getId);
})


