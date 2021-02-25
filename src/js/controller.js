import * as model from './model.js';
import recipeView from './views/recepieView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

async function controlRecipe() {
    try {
        const id = window.location.hash.slice(1);

        if (!id) return;
        await model.loadRecipe(id);
        resultsView.update(model.getSearchResultPage());
        recipeView.render(model.state.recipe);



    } catch (err) {
        console.log(err);
        recipeView.renderError();
    }
}

async function controlSearchResult() {
    try {
        resultsView.renderSpinner();
        const query = searchView.getQuery();
        if (!query) return;

        await model.loadSearchResult(query);
        resultsView.render(model.getSearchResultPage(1));
        paginationView.render(model.state);
    } catch (err) {
        console.log(err);
    }
}

function controlPagination(page) {
    resultsView.render(model.getSearchResultPage(page));
    paginationView.render(model.state);

}

function controlServings(serv){
    model.updateServings(serv);
    recipeView.update(model.state.recipe);

}


const init = function() {
    recipeView.addHandlerRender(controlRecipe);
    searchView.addHandlerSearch(controlSearchResult);
    paginationView.addHandlerClick(controlPagination);
    recipeView.addHandlerUpdateServings(controlServings)

}
init();