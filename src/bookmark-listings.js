import $ from 'jquery';
import store from './store';
import api from './api';

///////////view construction////////
const render = function() {
  
  //if adding is true render the view for adding
  if (store.adding) {
    $('main').html(`
        <form id="add-new-form" action="#"><!--add this form under the header div class controls-->
          <label for="bookmark-url">URL: </label>
          <input type="text" name="url" id="bookmark-url" pattern="\\bhttps?:\\/\\/\\S{1,}" placeholder="http://www.example.com" required title="url must include http:// or https://">
          <label for="bookmark-title">title: </label>
          <input type="text" name="title" id="bookmark-title" placeholder="~Bookmark Title ~">
          <fieldset role="radiogroup">
              <legend for="bookmark-rating">Rating:</legend>
              <label for="1-star">1 star</label><input type="radio" name="rating" id="1-star" value="1">
              <label for="2-star">2 star</label><input type="radio" name="rating" id="2-stars" value="2">
              <label for="3-star">3 star</label><input type="radio" name="rating" id="3-stars" value="3">
              <label for="4-star">4 star</label><input type="radio" name="rating" id="4-stars" value="4">
              <label for="5-star">5 star</label><input type="radio" name="rating" id="5-stars" value="5">
          </fieldset>
          <textarea name="desc" id="desc" placeholder="Describe this bookmark here ..."></textarea>
          <input type="submit" class="new-bookmark" value="Add New Bookmark">
          <input type="button" class="cancel-new-bookmark" value="Cancel">
        </form>
    `);
    $('header').html('<h1>My Bookmarks</h1>');
  }
  else if (store.error) {//render if error
    $('main').html(store.error);
  } else {
    //first add the ul <ul class="bookmark-list"> then add bookmarks to that list
    $('main').html(`
    <ul class="bookmark-list"></ul>
    `);
    //check for filter by stars
    const filteredBookmarks = [...store.bookmarks].filter(bookmark => bookmark.rating <= store.filter || !bookmark.rating);

    //render the main view
    $('.bookmark-list').html(
      filteredBookmarks
        .map(bkmk =>
          generateBookmarkListing(bkmk.id, bkmk.title, bkmk.url, bkmk.desc, bkmk.rating)
        )
        .join('')
    );
    //render the xpanded view if it is set?
  }
};

const renderControls = function() {
  $('header').html(`
    <h1>My Bookmarks</h1>
    <div class="controls">
      <button class="add-new">+ New</button>
      <select class="filter" name="filter">
        <option value="null">Filter by minimum rating</option>
        <option value="5">5</option>
        <option value="4">4</option>
        <option value="3">3</option>
        <option value="2">2</option>
        <option value="1">1</option>
      </select>
    </div>
  `);
};
const bindEventListeners = function() {
  handleSubmitBookmark();
  handleClickShowAddBookmarkView();
  handleFilterByRatingsOnBookmark();
  handleDisplayDetailedBookmark();
  handleDeleteBookmark();
  handleClickExpandBookmark();
};

const generateBookmarkListing = function(id, title, url, desc, rating) {

    
  
  return `<li class="bookmark js-condensed" id="${id}">
  ${generateTopPartOfBookmark(title,rating)}
  
</li>`;
};

const generateBottomPartOfBookmark =  function (url,desc) {
  return `<div class="remainder">
    <a class="bookmark-link" href="${url}">${url}</a>
    <p class="description">${desc||'This bookmark has not been described'}</p>
  </div>`
};

const generateTopPartOfBookmark = function(title, rating){
  return `<div class="top-part">
      <h2 class="bookmark-title">${title}</h2>
      <button class="condenser js-expanded" type="button">
        <img src="" alt="condense or expand" />
      </button>
      <span class="rating">stars:${rating||'Not yet rated'}</span>
    </div>`;
};


const bindTogetherAllListings = function(bookmarkList) {};

//////////////event handlers///////////////
const handleClickExpandBookmark = function() {
  
};

const handleDeleteBookmark = function() {};

const handleDisplayDetailedBookmark = function() {};

const handleSubmitBookmark = function() {
  $('#add-new-form').on('submit', event => {
    event.preventDefault();
    //handle bad submissions with error view
    store.setError(); //resets error to null in case of error previously
    store.setAdding(); //set back to adding = false

    //get the form data
    let formData = new FormData($('#add-new-form')[0]);
    let formDataObj = Object.fromEntries(formData);
    
    api.createBookmark(formDataObj).then(newBookmark=>{
      store.addBookmark(newBookmark);
    
      console.log(formDataObj);
      render();
      renderControls(); //controls are removed for adding mode putting them back after submission.
    });
  });
};

const handleFilterByRatingsOnBookmark = function() {
  $('select').on('change',event => {
    store.changeFilter(Number($('select option:selected').val())||5);
    render();
  });
};

const handleCancelSubmitBookmark =  function() {
  $('.cancel-new-bookmark').on('click', event => {
    store.setAdding();
    render();
    renderControls();
  });
};

const handleClickShowAddBookmarkView = function() {
  $('header').on('click','.add-new', event => {
    store.setAdding(); //sets adding to true
    render();
    handleSubmitBookmark();
    handleCancelSubmitBookmark();
  });
};

export default {
  bindEventListeners,
  render,
  renderControls
};
