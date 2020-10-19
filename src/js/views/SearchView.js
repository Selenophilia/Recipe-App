
import  * as DOMstr  from './base'

export const getInput = function(){ 
        return DOMstr.element.input.value
};

//paginations
export const renderResults = function(recipes, page = 1, resPerPage = 10){
    //render recipes and paginaton
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    //render pagination
    rendpageButtons(page, recipes.length, resPerPage)

    //render recipes
    recipes.splice(start, end).forEach(renderRecipes)
};


export const clearInput = () =>  {
    return DOMstr.element.input.value = "";
};

export const clearLists = () =>  {
     DOMstr.element.researchList.innerHTML = "";
     DOMstr.element.pages.innerHTML = "";
};  


export const highlightSelected = (id) => {
     document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active')
}

// private functions
const  renderRecipes = recipes  => {
    let resultLists = `<li>
                        <a class="results__link" href="#${recipes.recipe_id}" data-recipeId=${recipes.recipe_id}>
                            <figure class="results__fig">
                                <img src=${recipes.image_url} alt=${recipes.title}>
                            </figure>
                            <div class="results__data">
                                <h4 class="results__name">${limitTitle(recipes.title)} </h4>
                                <p class="results__author">${recipes.publisher}</p>
                            </div>
                        </a>
                    </li>`
    DOMstr.element.researchList.insertAdjacentHTML('beforeend', resultLists)
};
 
//  limiting titles
export const limitTitle = (title , limit = 18) => {
        const newTitle = []
        if(title.length > limit){
            title.split(" ").reduce((acc, cur) => {
                 if(acc + cur.length <= limit){
                    newTitle.push(cur)
                 }
                 return acc + cur.length;  
            }, 0);
            return `${newTitle.join(' ')}...`
        }
        return title;
 }

 const rendpageButtons = (page, numResults, resPerPage) =>{
        let pages = Math.ceil(numResults / resPerPage)
        let button;

        if(page === 1 && pages > 1){
                // should go to next page
                 button = renderButtons(page, 'next')
              
       } else if (page < pages){
        // should include both buttons
            button = `${renderButtons(page, 'next')}
                      ${renderButtons(page, 'prev')}`
        }else if (page === pages && pages > 1){
            // should go to  prev button
            button = renderButtons(page, 'prev')
        } 

        DOMstr.element.pages.insertAdjacentHTML('afterbegin', button)
 }

 const renderButtons = (page , type) => {
    let btnRender =  `<button class="btn-inline results__btn--${type}" data-goto=${type === 'prev'? page-1 : page +1}> 
                        <span>Page ${type === 'prev'? page - 1 : page + 1}</span>
                        <svg class="search__icon">
                            <use href="/img/icons.svg#icon-triangle-${type === 'prev'? 'left': 'right'}"></use>
                        </svg>
                     </button>`
    return btnRender;
 }
