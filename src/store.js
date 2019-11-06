const bookmarks = [];
let adding = false;
let error = null;
let filter = 0;

const findById = function(id) {
  return this.bookmarks.find(bookmark=> bookmark.id===id);
};

const addBookmark = function(bookmark) {
  this.bookmarks.push(bookmark);
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
  this.error = message;
};


export default {
  bookmarks,
  findById,
  addBookmark,
  findAndDelete,
  changeFilter,
  findAndUpdate,
  setError,
};