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
      console.log('generatedHTML: ', generatedHTML);
    }
  };

  const favoriteBooks = [];
  
  function initAction(){
    
    const clicker = document.querySelectorAll(select.itemBook.image);
    for(let item of clicker){
      item.addEventListener('dblclick', function(event){
        event.preventDefault();
        item.classList.add('favorite');
        const bookId = item.getAttribute('data-id');
        favoriteBooks.push(bookId);
        console.log('item', item);
        console.log('favorite: ', favoriteBooks);
      });
    }

    
   

  }
  render();
  initAction();
}