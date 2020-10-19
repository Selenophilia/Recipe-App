import  * as DOMstr  from './base'

export const renderitem = (recipe) => {
            // const {items } = item.items 
    
    const  renderItem =     recipe.items.map((elem, idx) => {
             return  `<li class="shopping__item" data-itemid=${elem.id}>
                    <div class="shopping__count">
                        <input type="number" value=${elem.count} step=${elem.count} class="shopping__count--value">
                        <p>${elem.unit}</p>
                    </div>
                    <p class="shopping__description">${elem.ingredients}</p>
                    <button class="shopping__delete btn-tiny">
                        <svg>
                            <use href="/img/icons.svg#icon-circle-with-cross"></use>
                        </svg>
                    </button>
                </li>`
            });
         DOMstr.element.shoppingList.insertAdjacentHTML('beforeend', renderItem)
    }

export const deleteitem = (id) => {
    const item = document.querySelector(`[data-itemid="${id}"]`)
    item.parentElement.removeChild(item);
}