
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
      if (!res.ok) {
        error = { code: res.status };
        console.log(res.status);
      }
      console.log(res.status);
      return res.json();
    })
    .then(data => {
      if (error) {
        error.message = data.message;
        console.log(data.message);
        
        return Promise.reject(error.message);
      }
      console.log(data);
      return data;
    }).catch(e=>{
      store.setError(e);
      console.log(store.error);
    });
};

//private function that wraps options in a valid JSON givin a method and optional body
const wrapOptions = function (method,body=null){
  let opt = Object.assign(options,{method,body:body?JSON.stringify(body):null});
  if(!body)delete opt.body;
  return opt;
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