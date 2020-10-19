import uniqueId from 'uniqid'

class Shopping {
    constructor(){
        this.items = []
  
    }
    addItem(count, unit, ingredients){
        const item = {
            id: uniqueId(),
            count,
            unit,
            ingredients,
        } 
        this.items.push(item)
        return item;
    }
    deleteItem(id){
        //check if id that is pass in is equal to the current id
        const index = this.items.findIndex(elem => elem.id === id)
        this.items.splice(index, 1)
    }
    updateCount(id, newCount){
        this.items.find(elem => elem.id === id).count = newCount
    }
}

export default Shopping