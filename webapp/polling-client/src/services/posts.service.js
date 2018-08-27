import {API_BASE_URL} from '../constants/constants';

const request=(options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*'
    });
    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);
 
   return fetch(options.url,options)
         .then(response => response.json()
           .then(json=> {
               if (!response.ok){
                   return Promise.reject(json);
               }
               return json;
           })
        )
}

export function login(loginVM){
   return request({
       url : API_BASE_URL + "/api/authenticate",
       method : 'POST',
       body : JSON.stringify(loginVM)
   })
}