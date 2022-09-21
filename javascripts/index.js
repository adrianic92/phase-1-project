// Declare variables here
let counter = 0
const body = document.body
const showAll = document.getElementById("showAll")
const button = document.getElementById("random")
const randomContainer = document.getElementById("randomContainer")
const form = document.getElementById("form")
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
    if (counter>=2){
        showAll.innerHTML = ""
        counter = 0
    }
    counter++
    const name = `${e.target.box.value.toLowerCase()}`;
    console.log(name)
    fetchPoke(name,appendPoke)
    form.reset()
}

function appendPoke(pokeArray) {
    const div = document.createElement("div")
    const p = document.createElement("p")
    const img = document.createElement("img")
    
    p.innerHTML = `<span class="nameNumber">#${pokeArray[2]}-${capitalize(pokeArray[1])}</span><br>HP: ${pokeArray[3]}<br>Attack: ${pokeArray[4]}<br>Defense: ${pokeArray[5]}<br>Sp. Attack: ${pokeArray[6]}<br>Sp. Defense: ${pokeArray[7]}<br>Speed: ${pokeArray[8]}`
    p.className = "allPokemonNames"
        
    div.id = "bubble"

    img.src = `${pokeArray[0]}`
    img.title = `${capitalize(pokeArray[1])}`
    img.className = "allPokemon"
    img.id = `${pokeArray[1]}`

    div.append(img, p)
    showAll.append(div)

}

function capitalize(a) {
    return a[0].toUpperCase() + a.slice(1);
}

function randomPoke() {
    const number = Math.floor(Math.random() * 904) + 1;
    fetchPoke(number, appendRandom);
}

function appendRandom(place) {
    randomContainer.innerHTML = "";
    
    const div = document.createElement("div")
    const p = document.createElement("p")
    const img = document.createElement("img")
    
    p.innerHTML = `<span class="randomClass">${capitalize(place[1])}</span>`
    p.id = "randomPokemonName"
        
    img.src = `${place[0]}`
    img.title = `${capitalize(place[1])}`
    img.id = `randomImage`
    
    div.id = "randomPokemon"
    div.append(img,p)
    randomContainer.append(div)
}

function list(array) {
    for (let i = 1; i < 906; i++) {
        fetchPoke(i, makeList)
    }
    array.sort();
    return array.sort();
}

list(nameList);

function makeList(pokeArray) {
    nameList.push(`${capitalize(pokeArray[1])} - #${pokeArray[2]}`)
}

function handleChange(e) {
    const letter = e.target.value;
    nameList.sort();
    const filteredPoke = nameList.filter(poke => poke.startsWith(letter));
    console.log(filteredPoke)
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