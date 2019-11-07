const bookmarks = [];
let adding = false;
let error = null;
let filter = 5;

const findById = function(id) {
  return this.bookmarks.find(bookmark => bookmark.id===id);
};

const addBookmark = function(bookmark) {
  this.bookmarks.push(bookmark);
  this.findAndUpdate(bookmark.id,{state:'c'});
};

const findAndDelete = function(id) {
  this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id===id);
};

const condensedState = function(id){
  return this.findById(id).state;
};

//should this also return
const changeFilter = function(number) { //takes a number between 1 and 5
  this.filter = number;
};

const findAndUpdate = function(id,newData) {
  Object.assign(this.findById(id),newData);
};

const setError = function(message) {
  this.error = message|| null;//if called with no params set back to null
};

const setAdding = function() {
  this.adding = !this.adding;
};


export default {
  findById,
  addBookmark,
  findAndDelete,
  changeFilter,
  findAndUpdate,
  setError,
  setAdding,
  filter,
  error,
  adding,
  bookmarks,
  condensedState
};