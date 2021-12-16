import { makeAutoObservable } from 'mobx';
import firebase from '@firebase/app-compat';

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
      } else {
        this.user = {
          displayName: '',
          email: '',
          uid: ''
        };
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
}

export const loginStore = new LoginStore();
