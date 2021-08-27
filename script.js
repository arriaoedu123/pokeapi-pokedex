const pokeCard = document.querySelector(".container");
const pokeName = document.querySelector(".data-poke-name");
const pokeIdNumb = document.querySelector(".data-poke-id");
const pokeTypes = document.querySelector(".data-poke-types");
const imgContainer = document.querySelector(".img-container");
const pokeImg = document.querySelector(".poke-image");
const pokeStats = document.querySelector(".data-poke-stats");
const pokeAbilities = document.querySelector(".data-poke-abilities");
const pokeStrong = document.querySelector(".data-poke-strong");
const pokeWeak = document.querySelector(".data-poke-weak");
const pokeInfo = document.querySelector(".data-poke-info");
const pokeButton = document.querySelector("#get-pokemon-button");
const pokeIcon = document.querySelector("#get-pokemon-button i");
const pokeExtra = document.querySelector(".data-poke-extra");
const pokePrev = document.querySelector(".poke-prev");
const pokeNext = document.querySelector(".poke-next");

var pokeId = 1;
var pokeId2 = 1;

const colors = {
    fire: "#fddfdf",
    grass: "#defde0",
    electric: "#fcf7de",
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
    electric: "#eed535"
};

getUrl1(pokeId);

function getUrl1(pokeId) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeId}`;
    fetch(url).then((res) => {
        return res.json();
    }).then((data1) => {
        const idType = {
            id: data1.id,
            type: data1.types.map(el => el.type.name)
        };
        const pokemon = {
            name: data1.name,
            id: data1.id,
            height: parseFloat(data1.height / 10).toFixed(1),
            weight: parseFloat(data1.weight / 10).toFixed(1),
            abilities: data1.abilities.map(abilities => abilities.ability.name),
            type: data1.types.map(typeInfo => typeInfo.type.name),
            stats_name: data1.stats.map(statsName => statsName.stat.name.replace("ecial-", ".")),
            stats: data1.stats.map(stats => stats.base_stat),
        };
        pokeId2 = pokemon.id;
        checkArrows();
        getUrl2(pokemon.type[0], pokemon);
    });
};

function getUrl2(typeName, pokemon) {
    const url = `https://pokeapi.co/api/v2/type/${typeName}`;
    fetch(url).then((res) => {
        return res.json();
    }).then((data2) => {
        const damage = {
            weakness: data2.damage_relations.double_damage_from.map(el => el.name),
            strong: data2.damage_relations.double_damage_to.map(el => el.name),
        }
        renderPokemon(pokemon, damage);
    });
};

function searchPokemon(event) {
    event.preventDefault();
    
    const inputValue = document.querySelector(".get-pokemon-input");
    
    if (!inputValue.value == "") {
        pokeId = inputValue.value.toLowerCase();
       
        console.log(pokeId);
        getUrl1(pokeId);
    }
}

function searchPokemonPrev() {
    pokeId2 -= 1;

    getUrl1(pokeId2);
}

function searchPokemonNext() {
    pokeId2 += 1;
    getUrl1(pokeId2);
}

function checkArrows() {
    if (pokeId2 == 1) {
        pokePrev.style.opacity = "0";
        pokePrev.style.visibility = "hidden";
        pokeNext.style.opacity = "1";
        pokeNext.style.visibility = "visible";
    }
    if (pokeId2 > 1 && pokeId2 < 898) {
        pokePrev.style.opacity = "1";
        pokePrev.style.visibility = "visible";
        pokeNext.style.opacity = "1";
        pokeNext.style.visibility = "visible";
    } else
    if (pokeId2 == 898) {
        pokeNext.style.opacity = "0";
        pokeNext.style.visibility = "hidden";
        pokePrev.style.opacity = "1";
        pokePrev.style.visibility = "visible";
    }
}

function renderPokemon(pokemon, damage) {
    const sprite = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon.id.toString().padStart(3, "0")}.png`;

    pokeName.textContent = pokemon.name;
    pokeImg.setAttribute('src', sprite);
    pokeIdNumb.textContent = `#${pokemon.id.toString().padStart(3, "0")}`;
    setCardColor(pokemon);
    renderPokemonTypes(pokemon);
    renderPokemonStats(pokemon);
    renderPokemonAbilities(pokemon);
    renderPokemonStrong(pokemon, damage);
    renderPokemonWeak(pokemon, damage);
    renderPokemonInfo(pokemon);
}

function setCardColor(pokemon) {
    const color = colors[pokemon.type[0]];
    const typeColor = typeColors[pokemon.type[0]];
    document.documentElement.style.setProperty('--background', typeColor);
    pokeCard.style.background = color;
    pokeButton.style.background = color;
    pokeIcon.style.color = typeColor;
}

function renderPokemonTypes(pokemon) {
    pokeTypes.innerHTML = "";

    for (let i = 0; i <= (pokemon.type.length - 1); i++) {
        const typeTextElement = document.createElement("label");
        typeTextElement.style.background = typeColors[pokemon.type[i]];
        typeTextElement.textContent = pokemon.type[i].charAt(0).toUpperCase() + pokemon.type[i].slice(1);
        pokeTypes.appendChild(typeTextElement);
    }
}

function renderPokemonStats(pokemon) {
    pokeStats.innerHTML = "";

    for (let i = 0; i <= (pokemon.stats.length - 1); i++) {
        var width = screen.width;
        const statElement = document.createElement("div");
        const statElementName = document.createElement("label");
        const statElementAmount = document.createElement("label");
        const upperCase = pokemon.stats_name[i].charAt(0).toUpperCase() + pokemon.stats_name[i].slice(1);
        statElementName.textContent = upperCase.replace('.a', '.A').replace('.d', '.D');
        statElementAmount.textContent = pokemon.stats[i];
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);

        if(width >= 465) {
            document.querySelector(`.bar${i}`).style.width = `${pokemon.stats[i]}px`;
        } else 
        if (width < 465) {
            document.querySelector(`.bar${i}`).style.width = `${pokemon.stats[i] - pokemon.stats[i] / 1.5}px`;
        }
    }
}

function renderPokemonAbilities(pokemon) {
    pokeAbilities.innerHTML = "";

    for (let i = 0; i <= (pokemon.abilities.length - 1); i++) {
        const abilitiesElement = document.createElement("label");
        abilitiesElement.textContent = pokemon.abilities[i].charAt(0).toUpperCase() + pokemon.abilities[i].slice(1);
        pokeAbilities.appendChild(abilitiesElement);
    }
}

function renderPokemonStrong(pokemon, damage) {
    pokeStrong.innerHTML = "";

    for (let i = 0; i <= (damage.strong.length - 1); i++) {
        const strongTextElement = document.createElement("label");
        strongTextElement.style.background = typeColors[damage.strong[i]];
        strongTextElement.textContent = damage.strong[i].charAt(0).toUpperCase() + damage.strong[i].slice(1);
        pokeStrong.appendChild(strongTextElement);
    }
}

function renderPokemonWeak(pokemon, damage) {
    pokeWeak.innerHTML = "";

    for (let i = 0; i <= (damage.weakness.length - 1); i++) {
        const weakTextElement = document.createElement("label");
        weakTextElement.style.background = typeColors[damage.weakness[i]];
        weakTextElement.textContent = damage.weakness[i].charAt(0).toUpperCase() + damage.weakness[i].slice(1);
        pokeWeak.appendChild(weakTextElement);
    }
}

function renderPokemonInfo(pokemon) {
    pokeExtra.innerHTML = `<label>Weight: ${pokemon.weight} kg</label>
                            <label>Height: ${pokemon.height} m</label>`;
}