

class favorites{
    constructor(){
        this.favorites = []
    }
    addFavorites(title, img, id, publisher){
        const obj = {
            id,
            title,
            img,
            publisher
        }
        this.favorites.push(obj)
        //for data persistence
        this.persistData()
        this.getLocalStorageData()
        return this.favorites
    }
    deleteFavorites(id){
        //check if id that is pass in is equal to the current id
        const index = this.favorites.findIndex(elem => elem.id === id)
        this.favorites.splice(index, 1)
    }
    isFavorites(id){
        return  this.favorites.findIndex(elem => elem.id === id)
    }
    numberOfFav(){
        return  this.favorites.length
    }
    persistData(){
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
       
    }
    getLocalStorageData(){
        let favoritesData = JSON.parse(localStorage.getItem('favorites'));
        if(favoritesData){
            //restore favorites data from localstorage
            this.favorites = favoritesData
        }


    }
    
}
export default favorites;