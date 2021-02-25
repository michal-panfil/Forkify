import icons from '../../img/icons.svg';

export default class View{
 
    render(data){
        if(!data || Array.isArray(data) && data.length === 0) return this.renderError();
        this.data = data;
        const markup = this.generateMarkup()
        this.clear();
        this.parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    update(data){
        this.data = data;
        const newMarkup = this.generateMarkup();
        const newDOM = document.createRange().createContextualFragment(newMarkup);
        const newElements = Array.from(newDOM.querySelectorAll('*'));
        const currElements = Array.from(this.parentElement.querySelectorAll('*'));

        newElements.forEach((newEl, i) => {
          const curEl = currElements[i];
          if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== ''){
            curEl.textContent = newEl.textContent;
          }

          if(!newEl.isEqualNode(curEl)){
            Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value));
          }
        })
      }

    clear(){
        this.parentElement.innerHTML = '';
    }
    
    renderSpinner(){
        const markup = `
            <div class="spinner">
                    <svg>
                      <use href="${icons}#icon-loader"></use>
                    </svg>
                  </div> 
            `;
        this.clear();
        this.parentElement.insertAdjacentHTML('afterbegin', markup);
      }

      renderError(message = this.errMsg){
          const markup = `<div class="error">
          <div>
            <svg>{
              <use href="${icons}#icon-alert-triangle"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>`;
        
        this.clear();
        this.parentElement.insertAdjacentHTML('afterbegin', markup);
        
      }
}