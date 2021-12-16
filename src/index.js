import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'mobx-react';
import { groceriesStore } from './stores/GroceriesStore.js';
import { itemsStore } from './stores/ItemsStore.js';
import { loginStore } from './stores/LoginStore.js';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

firebase.initializeApp({
  apiKey: "AIzaSyBsgv2v1NpTOuot2pQIn2MY3MU5J_bLok0",
  authDomain: "red-react-dahee.firebaseapp.com",
  databaseURL: "https://red-react-dahee-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "red-react-dahee",
  storageBucket: "red-react-dahee.appspot.com",
  messagingSenderId: "589523880013",
  appId: "1:589523880013:web:fca8be58cbd4b8fafbf404"
});

ReactDOM.render(
  <React.StrictMode>
    <Provider
      groceriesStore={groceriesStore}
      itemsStore={itemsStore}
      loginStore={loginStore}
    >
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
