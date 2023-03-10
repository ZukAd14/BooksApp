/* eslint-disable no-unused-vars */
{
  'use strict';

  const select = {
    templateOf: {
      book: '#template-book',
    },
    booksPanel: {
      wrapper: '.books-panel',
      booksList: '.books-list',
    },
    itemBook: {
      image: '.book__image',
    },
  };
  const templates = {
    book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
    
  };
  

  const render = function(){
    const thisBook = this;
    
    for(let book in dataSource.books){
      const bookId = dataSource.books[book];
      const generatedHTML = templates.book(bookId);
      thisBook.element = utils.createDOMFromHTML(generatedHTML);
      const bookContainer = document.querySelector(select.booksPanel.booksList);

      bookContainer.appendChild(thisBook.element);
      //console.log('generatedHTML: ', generatedHTML);
    }
  };

  const favoriteBooks = [];
  
  function initAction(){
    
    //const clicker = document.querySelectorAll(select.itemBook.image);
    //for(let item of clicker){
    const bookList = document.querySelector(select.booksPanel.booksList);
    bookList.addEventListener('dblclick', function(event){
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

        //debugger;
        console.log('Et: ', event.target);
        
        console.log('bookId: ', bookId);
        console.log('favorite: ', favoriteBooks);
      }
      
    });
    //}
  }
  render();
  initAction();
}
