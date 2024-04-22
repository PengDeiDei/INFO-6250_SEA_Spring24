export function fetchLogin(username) {
  return fetch('/api/session/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json', // set this header when sending JSON in the body of request
    },
    body: JSON.stringify( { username } ),
  })
  // fetch() rejects on network error
  .catch( err => Promise.reject({ error: 'network-error' }) )
  .then( response => {
    if(!response.ok) {  // response.ok checks the status code from the service
      // This service returns JSON on errors,
      // so we use that as the error object and reject
      return response.json().then( err => Promise.reject(err) );
    }
    return response.json();
  });
}

export function fetchLogout(){
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
