import $ from 'jquery';
import './main.css';

import api from './api';
import bl from './bookmarks-listings';
import store from './store';


//make sure to get things from the store and render the main view
const main = function() {
  //generate the main form for submitting individual bookmarks first

  //handle getting the main view after getting Bookmarks from the server
  api
    .getBookmarks()
    .then(bookmarks => {
      bookmarks.forEach(bookmark=>store.addBookmark(bookmark));
      bl.render();
    });
  //wait for user input and react to them
  bl.bindEventListeners();
  bl.renderControls();
  bl.render();
};

$(main());