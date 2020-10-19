import axios from 'axios'


class Search{
    constructor(query){
        this.query = query
    }
    async getRecipe(){
        try{
            const res  = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`)
            this.results = res.data.recipes
            return this.results
        } catch(err){
            throw err;
        }
    }
}

export default Search

