class SearchView{
parentEl = document.querySelector('.search');

getQuery(){
    var query = this.parentEl.querySelector('.search__field').value;
    this.clearInput();
    return query;

}

clearInput(){
    this.parentEl.querySelector('.search__field').value = '';
    console.log(this);
}
addHandlerSearch(handler){
    this.parentEl.addEventListener('submit', function(e){
        e.preventDefault();
        handler();
     });
}

}
export default new SearchView();