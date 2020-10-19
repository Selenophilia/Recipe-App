import Search  from './models/Search'
import Recipe from './models/Recipe'
import ShoppingList from './models/ShoppingCart'
import  * as DOMstr  from './views/base'
import Favorites from './models/favorites'

import * as SearchViews from './views/SearchView'
import * as Recipeviews from './views/RecipeViews'
import * as ListView from './views/ShoppingListViews'
import * as FavoritesViews from './views/favoritesViews'

/* state management of the app will include the ff:*/
// search 
// current recipe
// shopping list
// favorites/likes

const state = { }


// event listeners
DOMstr.element.submit.addEventListener('submit', function(e){
    ctrlSearch();
    e.preventDefault();
});


// pagination event
DOMstr.element.pages.addEventListener('click', async function(e){
    let btn = e.target.closest('.btn-inline');
    let pageNum; 
    let results = await state.search.getRecipe();

    if(btn){
       pageNum = parseInt(btn.dataset.goto, 10);
       SearchViews.clearLists();
       SearchViews.renderResults(results, pageNum) 
    }
});

// servings event
// shopping list event
// favorites event
DOMstr.element.recipes.addEventListener('click', (e)=> {
    const {ingredients, title, recipeId, publisher, img} = state.ingredients
    if(e.target.matches('.btn-decrease, .btn-decrease *')){
       if(state.ingredients.servings > 1){
            state.ingredients.updateServings('dec')
            DOMstr.updateIngrServings(state.ingredients)
       }
    } else  if(e.target.matches('.btn-increase, .btn-increase *')){
        state.ingredients.updateServings('inc')
        DOMstr.updateIngrServings(state.ingredients)
    } else  if( e.target.closest('.recipe__love, .recipe__love *')){
        //controller class should be called 
        //and passed state
        favoritesCtrl(SearchViews.limitTitle(title), img, recipeId, publisher)
    } else if(e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
        ingredients.forEach((elem, idx) => {
            shoppingListCtrl(elem.count, elem.unit, elem.ingredients)
        });
    }
})

//delete shopping list item event
DOMstr.element.shop.addEventListener('click', (e) => {
  const id = e.target.closest('.shopping__item').dataset.itemid
  const delBtn = e.target.matches('.shopping__delete, .shopping__delete *')
    
  if(delBtn){
        //delete item in the current state
        state.ShoppingList.deleteItem(id)
        //removed markup in the view
        ListView.deleteitem(id)
    
    }
});


// increase number of count in shopping list
DOMstr.element.shop.addEventListener('click', (e) => {
    const id = e.target.closest('.shopping__item').dataset.itemid
    const addCount = e.target.matches('.shopping__count--value')
      if(addCount){
            const val = parseFloat(e.target.value)
            state.ShoppingList.deleteItem(id, val)
        }
  });
//event listener when something changes in the page
window.addEventListener('hashchange', dispIngredientsCtrl)

// event listener when the page loads
window.addEventListener('load', () => {
    state.favorites = new Favorites();
    //fetch data
    state.favorites.getLocalStorageData()
    //toggle favorites button
    FavoritesViews.showFavMenu(state.favorites.numberOfFav())

    FavoritesViews.renderLocalStoragefavorites(state.favorites.favorites)
})

// search controller
async function ctrlSearch(){

    try{
        //TODO
        // will move this process to views
        let userInput = SearchViews.getInput()
        //prepare for search object
        state.search =  new Search(userInput) 
        
        //TODO
        //preare UI for results
        //clear input
        SearchViews.clearInput();
        SearchViews.clearLists();
        DOMstr.renderLoader(DOMstr.element.results);

        //research recipe on API
        let results = await state.search.getRecipe();
        //render UI
        DOMstr.clearLoader();
        SearchViews.renderResults(results)
     
    } catch(err){
        alert("Recipe not found!!")
    }
};


// recipe controller
 async function dispIngredientsCtrl(){
    try{
        const recipeId = window.location.hash.replace('#', '')
        if(recipeId){
            //await for recipe data and
            // create new instance of ingredients class
            // and store it inside the state object
            state.ingredients = new Recipe(recipeId)
            //clear UI
            Recipeviews.clear();
            // render loader;    
            DOMstr.renderLoader(DOMstr.element.recipes);
                     
            // wait for ingredients to fetch
            await state.ingredients.getIngredients()
           
            // parse ingredients units
            // and ingredients str
            state.ingredients.parseIngStr()

            //calc Time and Servings
             state.ingredients.calcTime()
             state.ingredients.calcServings()

            //render UI
            SearchViews.highlightSelected(recipeId)
            Recipeviews.renderRecipes(
                    state.ingredients
                    ,state.favorites.isFavorites(recipeId))
            DOMstr.clearLoader();
        }
    } catch(err){
        throw err;
    }
}

// shopping list ctrl
function shoppingListCtrl(count, unit, ingredients){
    state.ShoppingList = new ShoppingList()
    state.ShoppingList.addItem(count, unit, ingredients)
    
    ListView.renderitem(state.ShoppingList)
}

//favorites ctrl
function favoritesCtrl(title, img, recipeId, publisher){
    
        const currentId = recipeId
        if(state.favorites.isFavorites(currentId) === -1) {
            //add to fav to current state        
            const newFavorites = state.favorites.addFavorites(
                                    title, 
                                    img,
                                    currentId, 
                                    publisher)
        
            //toggle favorites state
         
            FavoritesViews.favorite(true)
            //render views
            FavoritesViews.renderfavorites(newFavorites)
        } else {
            //untoggle button and remove to state
            state.favorites.deleteFavorites(currentId)

            //toggle favorites state
            FavoritesViews.favorite(false)

            FavoritesViews.deleteitem(currentId)
        } 
    };

//for ingredients
//https://forkify-api.herokuapp.com/api/get?rId=47746

