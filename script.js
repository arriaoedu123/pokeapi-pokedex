const colors = {
	fire: "#fddfdf",
	grass: "#defde0",
	eletric: "#fcf7de",
	water: "#def3fd",
	ground: "#f4e7da",
	rock: "#d5d5d4",
	fairy: "#fceaff",
	poison: "98d7a5",
	bug: "#f8d5a3",
	dragon: "#97b3e6",
	psychic: "#eaeda1",
	flying: "#f5f5f5",
	fighting: "#e6e0d4",
	normal: "#f5f5f5",
	ice: "#87CEFA",
	steel: "#D3D3D3",
	ghost: "#9370DB",
	dark: "#808080"
};

const typeColors = {
	fire: "#fd7d24",
	poison: "#b97fc9",
	grass: "#9bcc50",
	psychic: "#f366b9",
	flying: "linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%)",
	ice: "#51c4e7",
	steel: "#9eb7b8",
	fighting: "#d56723",
	rock: "#a38c21",
	ground: "linear-gradient(180deg, #f7de3f 50%, #ab9842 50%)",
	dragon: "linear-gradient(180deg, #53a4cf 50%, #f16e57 50%)",
	ghost: "#7b62a3",
	dark: "#707070",
	fairy: "#fdb9e9",
	bug: "#729f3f",
	normal: "#a4acaf",
	water: "#4592c4",
	eletric: "#eed535"
};

const main_type = Object.keys(colors); 
const main_type_label = Object.keys(typeColors);

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
			height: parseFloat(data.height / 10).toFixed(1),
			weight: parseFloat(data.weight / 10).toFixed(1),
			abilities: data.abilities.map(abilities => abilities.ability.name),
			type_length: data.types.length,
			type: data.types.map(typeInfo => typeInfo.type.name),
			stats_name: data.stats.map(statsName => statsName.stat.name.replace("ecial-", ".")),
			stats: data.stats.map(stats => stats.base_stat)
		};
		console.log(pokemon.height, pokemon.weight);
		displayPokemon(pokemon, pokeId);
	});/*.catch((data) => {
		alert("this pokemon does not exists");
	});*/
};


function displayPokemon(pokemon, pokeId) {
	const type = main_type.find(type => pokemon.type.indexOf(type) > -1);
	const color = colors[type];

	if (pokemon.type_length == 1) {
		document.querySelector(".pokemon-type").innerHTML = `<label class="type1">${pokemon.type[0]}</label>`;

		const type_colors1 = main_type_label.find(typeLabel => pokemon.type[0].indexOf(typeLabel) > -1);
		const colorCard1 = typeColors[type_colors1];

		document.querySelector(".type1").style.background = colorCard1;

	} else
	if (pokemon.type_length == 2) {
		document.querySelector(".pokemon-type").innerHTML = `
		<label class="type1">${pokemon.type[0]}</label>
		<label class="type2">${pokemon.type[1]}</label>
		`;

		const type_colors1 = main_type_label.find(typeLabel => pokemon.type[0].indexOf(typeLabel) > -1);
		const colorCard1 = typeColors[type_colors1];

		const type_colors2 = main_type_label.find(typeLabel => pokemon.type[1].indexOf(typeLabel) > -1);
		const colorCard2 = typeColors[type_colors2];

		document.querySelector(".type1").style.background = colorCard1;
		document.querySelector(".type2").style.background = colorCard2;
	} else 
	if (pokemon.type_length == 3) {
		document.querySelector(".pokemon-type") = `
		<label class="type1">${pokemon.type[0]}</label>
		<label class="type2">${pokemon.type[1]}</label>
		<label class="type3">${pokemon.type[2]}</label>
		`;

		const type_colors1 = main_type_label.find(typeLabel => pokemon.type[0].indexOf(typeLabel) > -1);
		const colorCard1 = typeColors[type_colors1];

		const type_colors2 = main_type_label.find(typeLabel => pokemon.type[1].indexOf(typeLabel) > -1);
		const colorCard2 = typeColors[type_colors2];

		const type_colors3 = main_type_label.find(typeLabel => pokemon.type[2].indexOf(typeLabel) > -1);
		const colorCard3 = typeColors[type_colors3];

		document.querySelector(".type1").style.background = colorCard1;
		document.querySelector(".type2").style.background = colorCard2;
		document.querySelector(".type3").style.background = colorCard3;
	}
	
	document.querySelector(".pokemon-name").innerHTML = `${pokemon.name}`;
	document.querySelector(".pokemon-id").innerHTML = `#${pokemon.id.toString().padStart(3, "0")}`;
	document.querySelector(".pokemon-image").innerHTML = `<img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokeId.toString().padStart(3, "0")}.png"/>`;
	document.querySelector(".pokemon-card").style.background = color;
	document.querySelector(".pokemon-card-info-stats").innerHTML = `
					<ol class="pokemon-stats">
						<li class="status-hp">
							<label class="status-name">${pokemon.stats_name[0]}:</label>
							<label class="status-stats">${pokemon.stats[0]}</label>
						</li>
						<li class="status-attack">
							<label class="status-name">${pokemon.stats_name[1]}:</label>
							<label class="status-stats">${pokemon.stats[1]}</label>
						</li>
						<li class="status-defense">
							<label class="status-name">${pokemon.stats_name[2]}:</label>
							<label class="status-stats">${pokemon.stats[2]}</label>
						</li>
						<li class="status-sp-attack">
							<label class="status-name">${pokemon.stats_name[3]}:</label>
							<label class="status-stats">${pokemon.stats[3]}</label>
						</li>
						<li class="status-sp-defense">
							<label class="status-name">${pokemon.stats_name[4]}:</label>
							<label class="status-stats">${pokemon.stats[4]}</label>
						</li>
						<li class="status-speed">
							<label class="status-name">${pokemon.stats_name[5]}:</label>
							<label class="status-stats">${pokemon.stats[5]}</label>
						</li>
					</ol>
					<ol class="pokemon-info">
						<li class="info-abilities">
							<label class="info-name">Abilities</label>
							<span class="info-stats">
								<label class="info-stats1">${pokemon.abilities[0]}</label>
								<label class="info-stats2">${pokemon.abilities[1]}</label>
							</span>
						</li>
						<li class="info-extras">
							<label class="extra-name">Info</label>
							<span class="extra-stats">
								<label class="extra-info1">Weight: <label>${pokemon.weight} kg</label></label>
								<label class="extra-info2">Height: <label>${pokemon.height} m</label></label>
							</span>
						</li>
					</ol>
	`;
};

function rippleEffect() {
	const button = event.target; 
	const wave = document.createElement("span");

	wave.classList.add("wave");
	button.insertAdjacentElement("beforeend", wave);

	const buttonPosition = button.getBoundingClientRect();
	const top = event.clientY - buttonPosition.top; //getting top position of cursor
	const left =  event.clientX - buttonPosition.left; //getting left position of cursor 
	const scale = Math.min(buttonPosition.height, buttonPosition.width); 

	wave.style.setProperty("--top", `${top}px`); //adding top cursor position to the wave
	wave.style.setProperty("--left", `${left}px`); //adding left cursor position to the wave
	wave.style.setProperty("--opacity", 1);
	wave.style.setProperty("--scale", scale);

	function clearRipple() { //clear wave after animation
		wave.style.setProperty("--opacity", 0);
		wave.removeEventListener("transitionend", clearRipple);

		wave.addEventListener("transitionend", () => {
			wave.remove();
		});
	}

	wave.addEventListener("transitionend", clearRipple);
}

document.querySelector("button").addEventListener("click", () => {
	const inputValue = document.querySelector("#pokemoninput").value;

	if (!inputValue == "") {
		const lowerValue = inputValue.toLowerCase();
		const getId = lowerValue;

		rippleEffect();
		fetchPokemon(getId);
		console.log(getId);
	}
});

fetchPokemon(1);