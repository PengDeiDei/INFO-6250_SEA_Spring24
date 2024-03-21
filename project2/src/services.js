export function fetchLogin(username) {
  return fetch('/api/session/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json', 
    },
    body: JSON.stringify( { username } ),
  })
  .catch( err => Promise.reject({ error: 'network-error' }) )
  .then( response => {
    if(!response.ok) {
      return response.json().then( err => Promise.reject(err) );
    }

    return response.json(); 
  });
}

export function fetchLogout() {
  return fetch('/api/session/', {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
  })
  .catch( err => Promise.reject({ error: 'network-error'}) )
  .then( response => {
    if(!response.ok){
      return response.json().then( err => Promise.reject(err) )
    }
    return response.json();
  });
}

export function fetchSession(){
  return fetch('/api/session/')
  .catch( err => Promise.reject({ error: 'network-error'}) )
  .then( response => {
    if(!response.ok){
      return response.json().then( err => Promise.reject(err) )
    }
    return response.json();
  });
}

export function fetchMessage(){
  return fetch('/api/message/')
  .catch( err => Promise.reject({ error: 'network-error'}) )
  .then( response => {
    if(!response.ok){
      return response.json().then( err => Promise.reject(err) )
    }
    return response.json();
  });
}
  
export function fetchNewMessage(message){
  return fetch('/api/message/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify( { message } ),
  })
  .catch( err => Promise.reject({ error: 'network-error'}) )
  .then( response => {
    if(!response.ok){
      return response.json().then( err => Promise.reject(err) )
    }
    return response.json();
  });
}