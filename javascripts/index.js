let counter = 0
const body = document.body
const papaDiv = document.getElementById("showAll")
const button = document.getElementById("random")
const randomContainer = document.getElementById("randomContainer")
const form = document.getElementById("form")
const nameList = [];
const pokeDropdown = document.getElementById("pokeDropdown");
const ulContainer = document.getElementById("pokeContainer");

form.addEventListener("submit", submitPoke)
button.addEventListener("click", randomPoke)

function fetchPoke(name, foo) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then(response => response.json())
    .then(data => {
        const pokemon = data.sprites.other["official-artwork"]["front_default"]
        const pokemonName = data.name
        const pokemonNumber = data.id
        const hp = data.stats["0"]["base_stat"]
        const attack = data.stats["1"]["base_stat"]
        const defense = data.stats["2"]["base_stat"]
        const spAttack = data.stats["3"]["base_stat"]
        const spDefense = data.stats["4"]["base_stat"]
        const speed = data.stats["5"]["base_stat"]
        const pokeArray = [hp, attack, defense, spAttack, spDefense, speed]
        foo(pokemon, pokemonName, pokemonNumber, pokeArray)
    })
}

function submitPoke(e) {
    e.preventDefault();
    if (counter>=2){
        papaDiv.innerHTML = ""
        counter = 0
    }
    counter++
    console.log(e.target.box.value)
    const pokemon = `${e.target.box.value.toLowerCase()}`;
    console.log(pokemon)
    fetchPoke(pokemon,appendPoke)
    form.reset()
}

function appendPoke(pokemon, pokemonName, pokemonNumber, pokeArray) {
    const div = document.createElement("div")
    const p = document.createElement("p")
    const img = document.createElement("img")
    
    p.innerHTML = `<span class="nameNumber">#${pokemonNumber}-${capitalize(pokemonName)}</span><br>HP: ${pokeArray[0]}<br>Attack: ${pokeArray[1]}<br>Defense: ${pokeArray[2]}<br>Sp. Attack: ${pokeArray[3]}<br>Sp. Defense: ${pokeArray[4]}<br>Speed: ${pokeArray[5]}`
    p.className = "allPokemonNames"
        
    div.id = "bubble"

    img.src = `${pokemon}`
    img.title = `${capitalize(pokemonName)}`
    img.className = "allPokemon"
    img.id = `${pokemonName}`

    div.append(img, p)
    papaDiv.append(div)

}

function capitalize(a) {
    return a[0].toUpperCase() + a.slice(1);
}

function randomPoke() {
    const number = Math.floor(Math.random() * 904) + 1;
    fetchPoke(number, appendRandom);
}

function appendRandom(pokemon, pokemonName) {
    randomContainer.innerHTML = "";
    
    const div = document.createElement("div")
    const p = document.createElement("p")
    const img = document.createElement("img")
    
    p.innerHTML = `<span class="randomClass">${capitalize(pokemonName)}</span>`
    p.id = "randomPokemonName"
        
    img.src = `${pokemon}`
    img.title = `${capitalize(pokemonName)}`
    img.id = `randomImage`
    
    div.id = "randomPokemon"
    div.append(img,p)
    randomContainer.append(div)
}