import $ from 'jquery';
import store from './store';
import api from './api';

///////////view construction////////
const render = function(){
  //check for filter by stars

  //render the main view

  //render the xpanded view if it is set?

  //render if error
};

const bindEventListeners = function () {
  handleSubmitBookmark();
  handleSubmitRatingOnBookmark();
  handleDisplayDetailedBookmark();
  handleDeleteBookmark();
  handleClickExpandBookmark();
};

const generateBookmarkListing = function(){

};

const bindTogetherAllListings = function (bookmarkList) {
  
};

//////////////event handlers///////////////
const handleClickExpandBookmark = function(){

};

const handleDeleteBookmark = function(){

};

const handleDisplayDetailedBookmark = function(){

};

const handleSubmitBookmark = function(){

  //handle bad submissions with error view
};

const handleSubmitRatingOnBookmark = function(){

};

export default {
  bindEventListeners,
  render
};