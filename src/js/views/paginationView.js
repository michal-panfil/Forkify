import icons from '../../img/icons.svg';
import View from './View.js';

class PaginationView extends View {
    parentElement = document.querySelector('.pagination');

    addHandlerClick(handler) {
        this.parentElement.addEventListener('click', function(e) {
            const btn = e.target.closest('.btn--inline');
            if (!btn) return;
            const goToPage = +btn.dataset.goto;
            handler(goToPage);
        });
    }

    generateMarkup() {
        const numPages = Math.ceil(this.data.search.results.length / this.data.resultsPerPage);
        this.clear()
        if (this.data.page === 1 && numPages > 1)
            return `<button data-goto=${this.data.page + 1} class="btn--inline pagination__btn--next">
            <span>Page ${this.data.page + 1}</span>
            <svg class="search__icon">
              <use href="${icons}.svg#icon-arrow-right"></use>
            </svg>
            </button>`;
        if (this.data.page === numPages && numPages > 1) {
            return ` <button data-goto=${this.data.page - 1} class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}.svg#icon-arrow-left"></use>
            </svg>
            <span>Page ${data.page - 1}</span>
          </button>`;

        }
        if (this.data.page < numPages) {
            return ` <button data-goto=${this.data.page - 1} class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                  <use href="${icons}.svg#icon-arrow-left"></use>
                </svg>
                <span>Page ${this.data.page - 1}</span>
              </button>
              <button data-goto=${this.data.page + 1} class="btn--inline pagination__btn--next">
            <svg class="search__icon">
              <use href="${icons}.svg#icon-arrow-right"></use>
            </svg>
            <span>Page ${this.data.page + 1}</span>
          </button>`;
        }

        return '';

    }
}

export default new PaginationView();