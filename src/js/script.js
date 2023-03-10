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
    filters: {
      section: '.filters',
    }
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
  const filters = [];
  function initAction(){
    

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
  
    const filter = document.querySelector(select.filters.section);
    filter.addEventListener('click', function(event){
     
      
      if(event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter'){
        console.log('value: ', event.target.value);
        if(event.target.checked == true){
          filters.push(event.target.value);
        } else {
          const arrayFilterNumber = filters.indexOf(event.target.value);
          filters.splice(arrayFilterNumber, 1);
        }
      }
      hideBooks();
      console.log('filters: ', filters);
    });
  }

  const hideBooks = function(){
    for (let book of dataSource.books){
      
      let shouldBeHidden = false;
      for (let filter of filters){
        if(!book.details[filter]){
          shouldBeHidden = true;
          break;
        }
        //console.log('id: ', book.details[filter]);
      }
      console.log('dupa: ', book.id); 
      const BookImg = document.querySelector('[data-id="' + book.id + '"]');
      console.log('bimg: ', BookImg);
      if(shouldBeHidden == true){
        
        
        BookImg.classList.add('hidden');
      } else {
        BookImg.classList.remove('hidden');
      }
      
      //console.log('bimg: ', book);
    }
    
    
  };

  render();
  initAction();
}
