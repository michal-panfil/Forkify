import View from './View.js';
import icons from '../../img/icons.svg';

class ResultsView extends View {
    parentElement = document.querySelector('.results');
    errMsg = 'No recipes find for you query';


    generateMarkup() {
        return this.data.map(this.generatePreview).join('');
    }
    generatePreview(item) {

        return `
    <li class="preview">
        <a class="preview__link "preview__link--active"" href="#${item.id}">
        <figure class="preview__fig">
            <img src="${item.image}" alt="Test" />
        </figure>
        <div class="preview__data">
            <h4 class="preview__title">${item.title}</h4> 
            <p class="preview__publisher">${item.publisher}</p>
          
        </div>
        </a>
    </li>
    `;
    }
}

export default new ResultsView();