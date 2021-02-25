import 'regenerator-runtime/runtime';
import { API_URL } from './config.js';
import { RES_PER_PAGE } from './config.js';
import { getJSON } from './helper.js';
export const state = {
    recipe: {},
    search: {
        query: '',
        results: []
    },
    resultsPerPage: RES_PER_PAGE,
    page: 1
}
export const loadRecipe = async function(id) {
    try {
        const data = await getJSON(`${API_URL}${id}`);

        const { recipe } = data.data;
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            serving: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients
        }
    } catch (err) {
        throw err;
    }
}

export const loadSearchResult = async function(query) {
    try {
        state.search.query = query;
        const data = await getJSON(`${API_URL}?search=${query}`);
        state.search.results = data.data.recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
            }
        })
        state.page =1;

    } catch (err) {
        throw err;
    }
}

export const getSearchResultPage = function(page = state.search.page) {
    state.page = page;

    const start = (page - 1) * state.resultsPerPage;
    const end = page * state.resultsPerPage;
    return state.search.results.slice(start, end);
}
export function updateServings(newServings){
 state.recipe.ingredients.forEach(ing =>{
     ing.quantity = (ing.quantity * newServings) / state.recipe.serving;
 });
 state.recipe.serving = newServings;
}