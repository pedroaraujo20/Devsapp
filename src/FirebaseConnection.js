import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyBxDuG2q0yTeoFKlVGJJL4jpGEttVSOtj8",
    authDomain: "devsapp-2e36d.firebaseapp.com",
    databaseURL: "https://devsapp-2e36d.firebaseio.com",
    projectId: "devsapp-2e36d",
    storageBucket: "devsapp-2e36d.appspot.com",
    messagingSenderId: "1014351986229",
    appId: "1:1014351986229:web:947a209781537a2c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;