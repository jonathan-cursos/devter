import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDBtisc4MF1XicKQKaABskIxvoBcN0-dmM',
  authDomain: 'devter-35777.firebaseapp.com',
  projectId: 'devter-35777',
  storageBucket: 'devter-35777.appspot.com',
  messagingSenderId: '1067685632479',
  appId: '1:1067685632479:web:a3440f1ece40489285cc6a',
  measurementId: 'G-759D9QTPJR'
}

// siempre que recargamos con el autorefresh, sí ya teniamos una app incializada
// dara error, debemos inicializarla solo sí no lo está
firebase.default.apps.length === 0 &&
  firebase.default.initializeApp(firebaseConfig)

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL } = user
  return {
    avatar: photoURL,
    username: displayName,
    email
  }
}

export const onAuthStateChanged = (onChange) => {
  return firebase.default.auth().onAuthStateChanged(user => { // este user es el mismo que el de abajo
    const normalizedUser = mapUserFromFirebaseAuthToUser(user)
    onChange(normalizedUser)
  })
}

export const loginWithGitHub = () => {
  const gitHubProvider = new firebase.default.auth.GithubAuthProvider()
  return firebase.default
    .auth()
    .signInWithPopup(gitHubProvider)
}