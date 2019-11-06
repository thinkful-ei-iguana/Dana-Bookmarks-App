
import store from './store';
//function wraps requsts to the api in an asynchronous fetch promise
//inclues error handling for errors from using the api
const baseURL = 'https://thinkful-list-api.herokuapp.com/dana/bookmarks';
let options = {
  method:'',
  headers:new Headers({ 'Content-Type': 'application/json' }),
};

const apiFetch = function (...args){
  let error;
  
  return fetch(...args)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      error = { code: res.status };
    })
    .then(data => {
      if (error) {
        error.message = data.message;
        return Promise.reject(error.message);
      }
      console.log(data);
      return data;
    }).catch(e=>store.setError(e));
};

//private function that wraps options in a valid JSON givin a method and optional body
const wrapOptions = function (method,body=null){
  let opt = Object.assign(options,{method,body});
  if(!body)delete opt.body;
  return JSON.stringify(opt);
};

const getBookmarks = function () {
  return apiFetch(baseURL);
};

const createBookmark = function (formData) {
  return apiFetch(baseURL,wrapOptions('POST',formData));
};

const updateBookmark = function (id, property) {//may not be used
  return apiFetch(baseURL+`/${id}`, wrapOptions('PATCH',{property}));
};

const deleteBookmark = function (id) {
  return apiFetch(baseURL+`/${id}`, wrapOptions('DELETE'));
};



export default {
  getBookmarks,
  createBookmark,
  updateBookmark,
  deleteBookmark
};