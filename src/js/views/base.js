export const element  =  {
    input: document.querySelector('.search__field'),
    submit: document.querySelector('.search'),
    researchList: document.querySelector('.results__list'),
    results: document.querySelector('.results'),
    pages: document.querySelector('.results__pages'),
    recipes: document.querySelector('.recipe'),
    recipeIngUL: document.querySelector('.recipe__ingredient-list'),
    recipeLists: document.querySelector('.recipe__ingredients'),
    shoppingList: document.querySelector('.shopping__list'),
    shop: document.querySelector('.shopping'),
    favoritesList: document.querySelector('.likes__list'),
    favoritesMenu:  document.querySelector('.likes__field')
};

export const renderLoader = (parent) => {
    const loader = `<div class="loader">
                        <svg>
                            <use href="/img/icons.svg#icon-cw"></use>
                        </svg>
                    </div>`;
    parent.insertAdjacentHTML('afterbegin', loader)
};


export const clearLoader = () => {
   const clrLoader = document.querySelector(".loader")
        if(clrLoader){
            clrLoader.parentElement.removeChild(clrLoader)         
        }

};

export const renderItems = (ingredientsLists) => {
    // change recipe count , unit and ingredient string 
    let  renderIngredientsLists =  ingredientsLists.map((ing, idx) =>  {
               return  `<li class="recipe__item">
                            <svg class="recipe__icon">
                                <use href="/img/icons.svg#icon-check"></use>
                            </svg>
                            <div class="recipe__count">${decimalToFraction(ing.count)}</div>
                            <div class="recipe__ingredient">
                                <span class="recipe__unit">${ing.unit}</span>
                                ${ing.ingredients}
                            </div>
                         </li>`
             }).join(' ');
       return renderIngredientsLists;
}

export const updateIngrServings = (recipe) => {
    const {servings, ingredients } = recipe
    //updatse servings
    document.querySelector('.recipe__info-data--people').innerText = servings; 
   
    // //update all recupe
    let recipeCount = Array.from(document.querySelectorAll('.recipe__count'))
        recipeCount.forEach((elem , i) => {
              elem.innerText = decimalToFraction(ingredients[i].count)
        })
}

function decimalToFraction(value, donly = true) {
    var tolerance = 1.0E-6; // from how many decimals the number is rounded
    var h1 = 1;
    var h2 = 0;
    var k1 = 0;
    var k2 = 1;
    var negative = false;
    var i;
  
    if (parseInt(value) === value) {
      return value;
    } else if (value < 0) {
      negative = true;
      value = -value;
    }
  
    if (donly) {
      i = parseInt(value);
      value -= i;
    }
  
    var b = value;
  
    do {
      var a = Math.floor(b);
      var aux = h1;
      h1 = a * h1 + h2;
      h2 = aux;
      aux = k1;
      k1 = a * k1 + k2;
      k2 = aux;
      b = 1 / (b - a);
    } while (Math.abs(value - h1 / k1) > value * tolerance);
  
    return (negative ? "-" : '') + ((donly & (i != 0)) ? i + ' ' : '') + (h1 == 0 ? '' : h1 + "/" + k1);
  }


