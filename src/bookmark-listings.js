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
    const filteredBookmarks = [...store.bookmarks].filter(bookmark => bookmark.rating >= store.filter || !bookmark.rating);

    //render the main view
    $('.bookmark-list').html(
      filteredBookmarks
        .map(bkmk =>
          generateBookmarkListing(bkmk.id, bkmk.title, bkmk.url, bkmk.desc, bkmk.rating, bkmk.state)
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
  handleDeleteBookmark();
  handleClickExpandOrCondenseBookmark();
};

const generateBookmarkListing = function(id, title, url, desc, rating, state) {
  return `<li class="bookmark ${state==='c'?'js-condensed':''}" id="${id}">
  ${generateTopPartOfBookmark(title,rating)}
  ${state==='x'?generateBottomPartOfBookmark(url,desc):''}
</li>`;
};

const generateBottomPartOfBookmark =  function (url,desc) {
  return `<div class="remainder">
    <a class="bookmark-link" href="${url}">${url}</a>
    <p class="description">${desc||'This bookmark has not been described'}</p>
  </div>`;
};

const generateTopPartOfBookmark = function(title, rating){
  return `<div class="top-part">
      <h2 class="bookmark-title">${title}</h2>
      <button class="deleter" type="button">
        <i class="fa fa-trash-o trash" ></i>
      </button>
      <button class="condenser" type="button">
      <i class="fa fa-plus-square-o plus" ></i>
      </button>
      <span class="rating">stars:${rating||' Not yet rated'}</span>
    </div>`;
};



//////////////event handlers///////////////

const handleClickExpandOrCondenseBookmark = function() {
  $('main').on('click','.condenser', event =>{
    
    //get class of parent li
    const parentNode = $(event.currentTarget).closest('li');
    let parentNodeClass = parentNode.attr('class').split(' ');
    const parentNodeId = parentNode.attr('id');
    const parentStoreObj = store.findById(parentNodeId);
    
    //if li is js-condensed switch to js-expanded and generate top AND bottom <-could remove class for binary state
    if (parentNodeClass.includes('js-condensed')){
      parentNode.attr('class', parentNodeClass.filter(c => c!=='js-condensed').join(' '));//set class to not have condensed
      store.findAndUpdate(parentNodeId,{state:'x'});
      parentNode.html(
        generateTopPartOfBookmark(parentStoreObj.title,parentStoreObj.rating)
        +generateBottomPartOfBookmark(parentStoreObj.url,parentStoreObj.desc)
      );
    }
    else {
      parentNodeClass.push('js-condensed');
      parentNode.attr('class', parentNodeClass.join(' '));
      store.findAndUpdate(parentNodeId,{state:'x'});
      parentNode.html(generateTopPartOfBookmark(parentStoreObj.title,parentStoreObj.rating));
    }
    

  });
};

const handleDeleteBookmark = function() {
  //wait for delete button click
  $('main').on('click','.deleter',event => {
    const bookmarkId=$(event.currentTarget).closest('li').attr('id');
    //remove from server
    api.deleteBookmark(bookmarkId)
      .then(()=>{
        store.findAndDelete(bookmarkId);//remove from store
        render();//render
      });
  });
};

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
      
      handleFormError() || (function (){
        store.addBookmark(newBookmark);
        render();
        renderControls(); 
        handleClickShowAddBookmarkView();
        handleFilterByRatingsOnBookmark();
      })();
    });
  });
};

const handleFilterByRatingsOnBookmark = function() {
  $('select').on('change',() => {
    store.changeFilter(Number($('select option:selected').val())||5);
    render(); 
  });
};

const handleCancelSubmitBookmark =  function() {
  $('.cancel-new-bookmark').on('click', () => {
    store.setAdding();
    render();
    renderControls();
    handleClickShowAddBookmarkView();
    handleFilterByRatingsOnBookmark();
    // bindEventListeners();
  });
};

const handleClickShowAddBookmarkView = function() {
  $('.add-new').on('click', () => {
    store.setAdding(); //sets adding to true
    render();
    handleSubmitBookmark();
    handleCancelSubmitBookmark();
  });
};

const handleFormError = function () {
  if(store.error){
    alert(store.error);
    handleSubmitBookmark();
    handleCancelSubmitBookmark();
    store.setError();
    return 1;
  }
};

export default {
  bindEventListeners,
  render,
  renderControls,
  handleClickExpandOrCondenseBookmark
};
