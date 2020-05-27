import { useEffect, useState } from 'react';

const auth = window.firebase.auth();
const provider = new window.firebase.auth.GoogleAuthProvider();

export function useAuthentication(){
  const [authenticated, setAuthenticated] = useState('loading');

  function login(){
    auth.signInWithPopup(provider);
  };

  function logout(){
    auth
    .signOut()
    .then(function(){
      //Sign-out successful
    })
    .catch(function(error){
      // There is an error
    });
  }

  useEffect(() => {
    auth.onAuthStateChanged(function(user){
      // if there is a user
      if(user){
        setAuthenticated(user);
      } else {
        // if no user, set to nothing
        setAuthenticated();
      }
    }, function(error){
      console.log("Error: ", error)
    })
  }, []);

  return {login, logout, loggedIn: authenticated};
}