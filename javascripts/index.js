// Declare variables here
let counter = 0
const body = document.body
const showAll = document.getElementById("showAll")
const button = document.getElementById("random")
const randomContainer = document.getElementById("randomContainer")
const form = document.getElementById("form")
const pokeObjs = [];
const nameList = [];
const pokeDropdown = document.getElementById("pokeDropdown");
const ulContainer = document.getElementById("pokeContainer");

// Assign event listeners
form.addEventListener("submit", submitPoke)
button.addEventListener("click", randomPoke)
pokeDropdown.addEventListener("change", handleChange)

// Fetch data
function fetchPoke(name, foo) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then(response => response.json())
    .then(data => {
        const pokemonImage = data.sprites.other["official-artwork"]["front_default"]
        const pokemonName = data.name
        const pokemonNumber = data.id
        const hp = data.stats["0"]["base_stat"]
        const attack = data.stats["1"]["base_stat"]
        const defense = data.stats["2"]["base_stat"]
        const spAttack = data.stats["3"]["base_stat"]
        const spDefense = data.stats["4"]["base_stat"]
        const speed = data.stats["5"]["base_stat"]
        const pokeArray = [pokemonImage, pokemonName, pokemonNumber, hp, attack, defense, spAttack, spDefense, speed]
        foo(pokeArray)
    })
}

function submitPoke(e) {
    e.preventDefault();
    let found
    const input = `${e.target.box.value.toLowerCase()}`;
    pokeObjs.forEach(pokemon => {
        if ((input === pokemon.name) || (input === pokemon.number)) {
            if (counter>=2) {
                showAll.innerHTML = ""
                counter = 0
            }
            found = input
            counter++
            fetchPoke(input,appendPoke)
        }
    })
    form.reset()
    if (found === undefined) {
        alert("Uh oh! That's an invalid entry!\nPlease enter a valid Pokemon name or number between 1 and 905!")
    }
}

function appendPoke(pokeArray) {
    const div = document.createElement("div")
    createCard(pokeArray, div)
    showAll.append(div)
}

function capitalize(a) {
    return a[0].toUpperCase() + a.slice(1);
}

function randomPoke() {
    const number = Math.floor(Math.random() * 904) + 1;
    fetchPoke(number, appendRandom);
}

function appendRandom(pokeArray) {
    randomContainer.innerHTML = "";
    const div = document.createElement("div");
    createCard(pokeArray, div)
    randomContainer.append(div)
}

// fetch pokemon with one fetch request
function pokeGrab() {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=905`)
    .then(resp => resp.json())
    .then(data => {
        let allPokemon = data.results
        allPokemon.forEach(pokemon => {
            let obj = {}
            let splitURL = pokemon.url.split("/")
            obj.name = pokemon.name
            obj.number = splitURL[splitURL.length - 2]
            obj.url = pokemon.url
            pokeObjs.push(obj)
        })
        createList()
    })
}

pokeGrab()

function createList() {
    pokeObjs.forEach(pokemon => makeList(pokemon))
}

function makeList(pokemon) {
    nameList.push(`${capitalize(pokemon.name)} - #${pokemon.number}`)
}

function handleChange(e) {
    const letter = e.target.value;
    nameList.sort();
    const filteredPoke = nameList.filter(poke => poke.startsWith(letter));
    ulContainer.innerHTML = '';
    renderLis(filteredPoke);
}

function renderLis(lis) {
    lis.forEach(each => {
        const li = document.createElement('li')
        li.innerText = each
        ulContainer.append(li)
    }
    )
}

function createCard(pokeArray, div) {
    const p = document.createElement("p")
    const img = document.createElement("img")
    
    p.innerHTML = `<span class="nameNumber">#${pokeArray[2]}-${capitalize(pokeArray[1])}</span><br>HP: ${pokeArray[3]}<br>Attack: ${pokeArray[4]}<br>Defense: ${pokeArray[5]}<br>Sp. Attack: ${pokeArray[6]}<br>Sp. Defense: ${pokeArray[7]}<br>Speed: ${pokeArray[8]}`
    p.className = "allPokemonNames"
        
    div.id = "card"

    img.src = `${pokeArray[0]}`
    img.title = `${capitalize(pokeArray[1])}`
    img.className = "allPokemon"
    img.id = `${pokeArray[1]}`
    div.append(img, p)
}