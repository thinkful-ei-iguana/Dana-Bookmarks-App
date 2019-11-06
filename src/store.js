const bookmarks = [];
let adding = false;
let error = null;
let filter = 5;

const findById = function(id) {
  return this.bookmarks.find(bookmark=> bookmark.id===id);
};

const addBookmark = function(bookmark) {
  console.log(bookmark);
  this.bookmarks.push(bookmark);
  console.log(this.bookmarks);
};

const findAndDelete = function(id) {
  this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id===id);
};


//should this also return
const changeFilter = function(number) { //takes a number between 1 and 5
  this.filter = number;
};

const findAndUpdate = function(id,newData) {
  Object.assign(findById(id),newData);
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
  bookmarks
};