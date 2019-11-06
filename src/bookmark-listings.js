import $ from 'jquery';
import store from './store';
import api from './api';

///////////view construction////////
const render = function(){
  //if adding is true render the view for adding
  
  //check for filter by stars

  //render the main view

  //render the xpanded view if it is set?

  //render if error
};

const bindEventListeners = function () {
  handleSubmitBookmark();
  handleClickShowAddBookmarkView();
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
  $(submit).on('submit',event);
  //handle bad submissions with error view
};

const handleSubmitRatingOnBookmark = function(){

};

const handleClickShowAddBookmarkView = function(){
  $('.add-new').on('click',event=>{
    //render bookmark form view
  });
};

export default {
  bindEventListeners,
  render
};