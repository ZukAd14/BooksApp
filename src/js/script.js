/* eslint-disable no-unused-vars */
{
  'use strict';

  const select = {
    templateOf: {
      book: '#template-book',
    },
    all: {
      wrapper: 'container',
    },
    booksPanel: {
      wrapper: '.books-panel',
      booksList: '.books-list',
    },
    itemBook: {
      image: '.book__image',
    },
    filters: {
      section: '.filters',
    }
  };
  const templates = {
    books: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML), 
  };
  
  const favoriteBooks = [];
  const filters = [];

  class BooksList {
    constructor(data){
      const thisBooksList = this;
      thisBooksList.data = data;
      thisBooksList.initData();
      thisBooksList.getElements();
      thisBooksList.initActions();
      thisBooksList.filterBooks();
      thisBooksList.determineRatingBgc();
    }
    initData(){
      const thisBooksList = this;
      this.data = dataSource.books;
      

      for(const book of this.data){
        book.ratingBgc = thisBooksList.determineRatingBgc(book.rating);
        book.ratingWidth = book.rating * 10;
        
        const generatedHTML = templates.books(book);
        const utlFunc = utils.createDOMFromHTML(generatedHTML);
        const bookContainer = document.querySelector(select.booksPanel.booksList);
        bookContainer.appendChild(utlFunc);
      }
    }
    getElements(){
      const thisBooksList = this;

      thisBooksList.bookList = document.querySelector(select.booksPanel.booksList);
      thisBooksList.filter = document.querySelector(select.filters.section);
    }
    initActions(){
      const thisBooksList = this;
      
      thisBooksList.bookList.addEventListener('dblclick', function(event){
        
        event.preventDefault();
        if(event.target.offsetParent.classList.contains('book__image')){
        
          const bookId = event.target.offsetParent.getAttribute('data-id');
        
          if(favoriteBooks.indexOf(bookId) == -1){
            event.target.offsetParent.classList.add('favorite');
            favoriteBooks.push(bookId);
          } else {
            event.target.offsetParent.classList.remove('favorite');
            const arrayElementNumber = favoriteBooks.indexOf(bookId);
            favoriteBooks.splice(arrayElementNumber, 1);
          }

          console.log('Et: ', event.target);
          console.log('bookId: ', bookId);
          console.log('favorite: ', favoriteBooks);
        }
      });
  
    }
    filterBooks(){
      const thisBooksList = this;

      thisBooksList.filter.addEventListener('click', function(event){
     
        if(event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter'){
          console.log('value: ', event.target.value);
          if(event.target.checked == true){
            filters.push(event.target.value);
          } else {
            const arrayFilterNumber = filters.indexOf(event.target.value);
            filters.splice(arrayFilterNumber, 1);
          }
        }
        thisBooksList.hideBooks();
        console.log('filters: ', filters);
      });
    }
    determineRatingBgc(rating){
      const thisBooksList = this;
      if(rating<6){
        return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if(rating > 6 && rating <=8){
        return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if(rating > 8 && rating <= 9){
        return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if(rating > 9){
        return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
    }
    hideBooks(){
      const thisBooksList = this;
      for (let book of dataSource.books){
      
        let shouldBeHidden = false;
        for (let filter of filters){
          if(!book.details[filter]){
            shouldBeHidden = true;
            break;
          }
          //console.log('id: ', book.details[filter]);
        }
        
        const BookImg = document.querySelector('[data-id="' + book.id + '"]');
        console.log('bimg: ', BookImg);
        if(shouldBeHidden == true){ 
          BookImg.classList.add('hidden');
        } else {
          BookImg.classList.remove('hidden');
        }
      }
    }
  }

  const app = new BooksList();
}

