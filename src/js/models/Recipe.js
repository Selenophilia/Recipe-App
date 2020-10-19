import axios from 'axios'


class Recipe {
    constructor(recipeId){
        this.recipeId = recipeId
    }
    async  getIngredients(){
       try{           
            let results      = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.recipeId}`)
            this.recipe      = results.data.recipe;
            this.title       = results.data.recipe.title;
            this.publisher   = results.data.recipe.publisher;
            this.img         = results.data.recipe.image_url;
            this.ingredients = results.data.recipe.ingredients;
            this.url         = results.data.recipe.source_url;
        }catch(err){
           alert('Something went wrong in processing the recipe!')
           throw err;
       }
    }
    calcTime(){
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng/3)
        this.time = periods * 15;
    
    }
    calcServings(){
        this.servings = 4;
    }
    
     parseIngStr(){
         //to standardize units
         const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon',
                             'cups', 'pounds','kilograms','kilogram', 'gram']
         const unitShort = ['tbsp', 'tbsp','oz','oz', 'tsp','tsp','cup', 'pound', 'kg', 'g']
         
         const newIngredients = this.ingredients.map((elem) => {
                //to uniform units to tbsp, oz and etc..
                let ingredients = elem.toLowerCase(); 
                    unitsLong.forEach((unit, i) => {
                        ingredients = ingredients.replace(unit, unitShort[i])
                    })
                    //to remove parenthesis
                    ingredients = ingredients.replace(/ *\([^)]*\) */g, "")

                    // to split numbers and unit from thhe string
                    const ingArr   = ingredients.split(' ');
                    const unitsIdx = ingArr.findIndex(elem2 =>  unitShort.includes(elem2)); 
                    let obj;

                     if(ingArr[0] === ""){  
                        obj = {
                            count: 1,
                            unit: ingArr[unitsIdx],
                            ingredients
                        }
                    }
                    else if(unitsIdx > -1){
                        // if there is a unit a number
                        // ex. 3 1/2 "ingredients..."
                        let count;
                        let arrCount = ingArr.slice(0, unitsIdx)
                            if(arrCount.length === 1){
                                count = eval(ingArr[0].replace('-', '+'))                                
                            } else {
                                count = eval(ingArr.slice(0, unitsIdx).join('+'))
                            }
                         obj = {
                             count,
                             unit: ingArr[unitsIdx],
                             ingredients: ingArr.slice(unitsIdx + 1).join(' ')
                         }        
                    } else if(parseInt(ingArr[0], 10)){           
                        // if there is a number without a unit included in the units array  
                        obj = {
                            count: parseInt(ingArr[0], 10),
                            unit: ' ',
                            ingredients: ingArr.slice(1).join(' ')
                        }
                    } else if(unitsIdx === -1){
                            // if there is no unit and number in 1st position
                        obj = {
                            count: 1,
                            unit: ' ',
                            ingredients
                        }
                    }  

                    return obj;
        });
        this.ingredients = newIngredients

    }
    updateServings(type){
        let newServings = type === 'dec' ?  newServings =  this.servings - 1 : newServings = this.servings + 1;
        
        this.ingredients.forEach(ingr => {      
                    ingr.count *= (this.servings / newServings)
                    // ingr.count = result 
        });
        this.servings = newServings;
    }

};



export default Recipe;