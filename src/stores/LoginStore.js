import { makeAutoObservable } from 'mobx';
import firebase from '@firebase/app-compat';
import { itemsStore } from './ItemsStore.js';

export default class LoginStore {
  constructor() {
    makeAutoObservable(this);
  }

  user = {
    displayName: '',
    email: '',
    uid: ''
  };

  onAuthStateChanged() {
    firebase.auth().onAuthStateChanged(firebaseUser => {
      console.log(firebaseUser);
      if (firebaseUser) {
        this.user = {
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          uid: firebaseUser.uid
        };
        itemsStore.itemsRead();
      } else {
        this.user = {
          displayName: '',
          email: '',
          uid: ''
        };
        if (window.location.pathname !== '/home') {
          window.location.href = '/'
        }
      }
    });
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  googleLogout() {
    firebase.auth().signOut();
  }

  emailSignup() {
    const email = 'guest@red-react-dahee.web.app';
    const password = 'guestguest'
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      console.error(error);
      alert(error.message);
    });
  };

  emailSignin() {
    const email = 'guest@red-react-dahee.web.app';
    const password = 'guestguest';
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      console.error(error);
      alert(error.message);
    });
  };
}

export const loginStore = new LoginStore();
