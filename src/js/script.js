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
  };
  const templates = {
    book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
    
  };
  

  const render = function(){
    const thisBook = this;
    thisBook.data = dataSource.books;
    for(let book in dataSource.books){
      const bookId = dataSource.books[book];
      const generatedHTML = templates.book(bookId);
      thisBook.element = utils.createDOMFromHTML(generatedHTML);
      const bookContainer = document.querySelector(select.booksPanel.booksList);

      bookContainer.appendChild(thisBook.element);
      console.log('generatedHTML: ', generatedHTML);
    }
  };
  render();
}