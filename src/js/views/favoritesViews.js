import  * as DOMstr  from './base'

export const renderfavorites = (favorites) => {
    
   const  rendfavorites = favorites.slice(favorites.length -1 , favorites.length).map(elem => {
          return  `<li>
                    <a class="likes__link" href="#23456" data-itemid=${elem.id}>
                        <figure class="likes__fig">
                            <img src="${elem.img}" alt="Test">
                        </figure>
                        <div class="likes__data">
                            <h4 class="likes__name">${elem.title}</h4>
                            <p class="likes__author">${elem.publisher}</p>
                        </div>
                    </a>
                </li>`     
        });
         DOMstr.element.favoritesList.insertAdjacentHTML('beforeend', rendfavorites)
    }

export const renderLocalStoragefavorites = (localStorageFav) => {
        const  rendLocalStoragefavorites = localStorageFav.map(elem => {
       
        return  `<li>
                        <a class="likes__link" href="#23456" data-itemid=${elem.id}>
                            <figure class="likes__fig">
                                <img src="${elem.img}" alt="Test">
                            </figure>
                            <div class="likes__data">
                                <h4 class="likes__name">${elem.title}</h4>
                                <p class="likes__author">${elem.publisher}</p>
                            </div>
                        </a>
                    </li>`     
        });

         DOMstr.element.favoritesList.insertAdjacentHTML('beforeend', rendLocalStoragefavorites)
           
     }

export const deleteitem = (id) => {
    const item = document.querySelector(`[data-itemid="${id}"]`).parentElement
    item.parentElement.removeChild(item);
}

export const favorite = (isFavorite) => {
    if(isFavorite === true){
        document.querySelector('.favorites-btn').setAttribute('href','/img/icons.svg#icon-heart')
    } else {
        document.querySelector('.favorites-btn').setAttribute('href','/img/icons.svg#icon-heart-outlined')
    }

}

export const showFavMenu = (numFaves) => {
    DOMstr.element.favoritesMenu.style.visibility = numFaves > 0 ?  'visible': 'hidden'; 
}