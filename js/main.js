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

function ins() {
    const input = document.querySelector('#input').value 
    document.querySelector('#cocktailInfo').innerHTML = ''
    if (input !== '') {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`) 
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < data.drinks.length; i++) {
                if (data.drinks == null || data.drinks == undefined) {
                    document.querySelector('#cocktailInfo').innerHTML += 'Not found.'
                } else {
                    console.log(data)
                    let ingredients = [data.drinks[i].strIngredient1, data.drinks[i].strIngredient2, data.drinks[i].strIngredient3, data.drinks[i].strIngredient4, data.drinks[i].strIngredient5, data.drinks[i].strIngredient6, data.drinks[i].strIngredient7, data.drinks[i].strIngredient8, data.drinks[i].strIngredient9, data.drinks[i].strIngredient10, data.drinks[i].strIngredient11, data.drinks[i].strIngredient12, data.drinks[i].strIngredient13, data.drinks[i].strIngredient14, data.drinks[i].strIngredient15].filter(x => x != null)
                    console.log(ingredients)
                    document.querySelector('#cocktailInfo').innerHTML += `
                    <h2>${data.drinks[i].strDrink}</h2>
                    <img src="${data.drinks[i].strDrinkThumb}">
                    <div class="ingList">Ingredients: ${ingredients}</div>
                    <div class="instr">${data.drinks[i].strInstructions}</div>
                    `
                }
            }
        })
        .catch(err => console.log(`error: ${err}`))
    }
}

const clear = document.querySelector('#clear')
clear.addEventListener('click', clearAllFields)

function clearAllFields() {
    document.querySelector('#input').value = ''
    document.querySelector('#cocktailInfo').innerHTML = ''
}