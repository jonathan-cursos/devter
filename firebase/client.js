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

const db = firebase.firestore()

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL, uid } = user
  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid
  }
}

export const onAuthStateChanged = (onChange) => {
  return firebase.default.auth().onAuthStateChanged((user) => {
    // este user es el mismo que el de abajo
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null
    onChange(normalizedUser)
  })
}

export const loginWithGitHub = () => {
  const gitHubProvider = new firebase.default.auth.GithubAuthProvider()
  return firebase.default.auth().signInWithPopup(gitHubProvider)
}

export const addDevit = ({ avatar, content, userId, userName }) => {
  return db.collection('devits').add({
    avatar,
    content,
    userId,
    userName,
    createAdd: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0
  })
} // Esto retorna una promesa

export const fetchLatestDevits = () => {
  return db
    .collection('devits')
    .get()
    .then((snapshot) => {
      return snapshot.docs.map((doc) => {
        const data = doc.data()
        const id = doc.id
        return {
          id,
          ...data
        }
      })
    })
}
