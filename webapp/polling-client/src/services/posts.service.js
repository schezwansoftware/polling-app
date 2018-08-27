import {API_BASE_URL,ACCESS_TOKEN} from '../constants/constants';

const request=(options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*'
    });

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

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
   });
}


export function getCurrentUser(){
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }else{
        return request({
            url : API_BASE_URL + "/api/users/me",
            method: "GET" 
        });
    }
}