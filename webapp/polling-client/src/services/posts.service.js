import {ACCESS_TOKEN} from '../constants/constants';

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
       url : "/api/authenticate",
       method : 'POST',
       body : JSON.stringify(loginVM)
   });
}


export function getCurrentUser(){
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }else{
        return request({
            url : "/api/users/me",
            method: "GET" 
        });
    }
}

export function logout(){
    localStorage.removeItem(ACCESS_TOKEN);
}


export function register(managedUserVM){
   return request({
        url: '/api/account/register',
        method: 'POST',
        body: JSON.stringify(managedUserVM)
    });
}

export function checkUserNameAvailability(userName){
    const url=`/api/account/username-available/${userName}`;
   return fetch(url,{
       method: 'GET'
   }).then(response =>{
       if(response.status === 202){
           return true;
       }else if(response.status === 400){
           return false;
       }
   });
}

export function checkEmailAvailability(email){
    const url= `/api/account/email-available/${email}`;
    return fetch(url,{
        method: 'GET'
    }).then(response => {
        if(response.status === 202){
            return true;
        }else if(response.status === 400){
            return false;
        }
    });
}


export function createPoll(pollRequest){
    const url=`/api/polls`;
    return request({
        url: url,
        method: 'POST',
        body: JSON.stringify(pollRequest)
    });
}


export function getAllPostsByUser(){
    const url='/api/mypolls'
    return request({
        url: url,
        method: 'GET'
    });
}