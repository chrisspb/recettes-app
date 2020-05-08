import Rebase from 're-base'
import firebase from 'firebase/app'
import 'firebase/database'

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCad0NcLAq9qMHFO60zbtlomkRgloBEgLQ",
    authDomain: "recettes-app-9107e.firebaseapp.com",
    databaseURL: "https://recettes-app-9107e.firebaseio.com",
})

const base = Rebase.createClass(firebaseApp.database())

// This is a named export
export { firebaseApp }

// this is a default export
// correspond à la bdd
export default base
