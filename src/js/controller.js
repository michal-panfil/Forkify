import * as model from './model.js';
import recipeView from './views/recepieView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

 async function controlRecipe(){
  try{
    const id = window.location.hash.slice(1);
    
    if(!id) return;
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  
  } catch(err){
    console.log(err);
    recipeView.renderError();
  }
}

async function controlSearchResult(){
  try{
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if(!query) return;

    await model.loadSearchResult(query);
    resultsView.render(model.state.search.results);
  }catch(err){
    console.log(err);
  }
}
const init = function(){
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResult);

}
init();

