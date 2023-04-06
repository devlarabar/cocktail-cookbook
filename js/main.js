//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM

// const submit = document.querySelector('button')

// submit.addEventListener('click', ins)

// function delay(milliseconds){
//     return new Promise(resolve => {
//         setTimeout(resolve, milliseconds);
//     });
// }

// function ins() {
//     const input = document.querySelector('#input').value 
//     if (input !== '') {
//         fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`) 
//         .then(res => res.json())
//         .then(async data => {
//             for (let i = 0; i < data.drinks.length; i++) {
//                 if (data.drinks == null) {
//                     document.querySelector('h2').innerText = 'not found'
//                     document.querySelector('img').src = 'not found'
//                     document.querySelector('h3').innerText = 'not found'
//                 } else {
//                     console.log(data)
//                     document.querySelector('h2').innerText = data.drinks[i].strDrink
//                     document.querySelector('img').src = data.drinks[i].strDrinkThumb
//                     document.querySelector('.instr').innerText = data.drinks[i].strInstructions
//                 }
//                 await delay(3000);
//             }
//         })
//         .catch(err => console.log(`error: ${err}`))
//     }
// }



const submit = document.querySelector('#submit')
submit.addEventListener('click', ins)

//popular drinks onClick
const popularDrinks = Array.from(document.querySelectorAll('.popularBeverages img'))
popularDrinks.forEach((x, i) => {
    x.addEventListener('click', () => {
        const searchBar = document.querySelector('#input')
        searchBar.value = x.id
        ins()
    })
})

function ins() {
    const input = document.querySelector('#input').value 
    if (input !== '') {
        document.querySelector('#cocktailInfo').innerHTML = ''
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`) 
        .then(res => res.json())
        .then(data => {
            console.log(data)

            if (data.drinks == null || data.drinks == undefined) {
                document.querySelector('#cocktailInfo').innerHTML = `<p class="err">Not found.</p>`
            } 
            
            else {
                const liveFilterContainer = `
                <section class="liveFilterContainer">
                    <label for="liveFilter">Filter</label>
                    <input type="search" oninput="liveFilter()" id="liveFilter" placeholder="Filter your results!">
                </section>`
                document.querySelector('#cocktailInfo').innerHTML = `
                <h2>${input}</h2>
                <span class="tagline">Showing Recipes</span>
                ${liveFilterContainer}
                `
                // .map(x => `<li>${x}</li>`)
                // .map(x => `<li>${x}</li>`)

                for (let i = 0; i < data.drinks.length; i++) {
                    //put ingredients into an array, filter out null
                    let ingredients = [data.drinks[i].strIngredient1, data.drinks[i].strIngredient2, data.drinks[i].strIngredient3, data.drinks[i].strIngredient4, data.drinks[i].strIngredient5, data.drinks[i].strIngredient6, data.drinks[i].strIngredient7, data.drinks[i].strIngredient8, data.drinks[i].strIngredient9, data.drinks[i].strIngredient10, data.drinks[i].strIngredient11, data.drinks[i].strIngredient12, data.drinks[i].strIngredient13, data.drinks[i].strIngredient14, data.drinks[i].strIngredient15].filter(x => x != null)

                    //put ingredient amounts into an array, filter out null
                    let ingredientMeasures = [data.drinks[i].strMeasure1, data.drinks[i].strMeasure2, data.drinks[i].strMeasure3, data.drinks[i].strMeasure4, data.drinks[i].strMeasure5, data.drinks[i].strMeasure6, data.drinks[i].strMeasure7, data.drinks[i].strMeasure8, data.drinks[i].strMeasure9, data.drinks[i].strMeasure10, data.drinks[i].strMeasure11, data.drinks[i].strMeasure12, data.drinks[i].strMeasure13, data.drinks[i].strMeasure14, data.drinks[i].strMeasure15].filter(x => x != null)

                    //combine ingredients and amounts into one array, turn them into list items, join
                    let ingredientsAndMeasures = ingredients.map((x, i) => `<li>${x} - ${ingredientMeasures[i]}</li>`).join('')

                    //insert info into the DOM
                    document.querySelector('#cocktailInfo').innerHTML += `
                    <div class="drinkBlock">
                    <img src="${data.drinks[i].strDrinkThumb}" class="drinkImg">
                    <div class="drinkInfo">
                    <h3>${data.drinks[i].strDrink}</h3>
                    <div class="ingList">Ingredients: <ul class="flex">${ingredientsAndMeasures}</ul></div>
                    <div class="instr">${data.drinks[i].strInstructions}</div>
                    </div>
                    </div>`
                }

                document.querySelector('#cocktailInfo').scrollIntoView()
            }
        })
        .catch(err => console.log(`error: ${err}`))
    }
}

//clear button
const clear = document.querySelector('#clear')
const promptSearch = document.querySelector('.promptSearch').innerHTML
clear.addEventListener('click', clearAllFields)

function clearAllFields() {
    document.querySelector('#input').value = ''
    document.querySelector('#cocktailInfo').innerHTML = `<span class="promptSearch">${promptSearch}</span>`
}


//live search
function liveFilter() {
    let drinkResults = document.querySelectorAll('.drinkBlock')
    let searchQuery = document.getElementById("liveFilter").value;
    for (let i = 0; i < drinkResults.length; i++) {
      if(drinkResults[i].innerHTML.toLowerCase()
        .includes(searchQuery.toLowerCase())) {
            drinkResults[i].classList.remove("is-hidden");
      } else {
        drinkResults[i].classList.add("is-hidden");
      }
    }
  }