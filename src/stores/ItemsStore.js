import { configure, makeAutoObservable } from 'mobx';
// import moment from 'moment';
import axios from 'axios';
import { axiosError } from './common.js';

configure({
  enforceActions: 'never',
  useProxies: 'never'
});

export default class ItemsStore {
  constructor() {
    makeAutoObservable(this);
  }

  items = [];
  item = {
    name: '',
    enter: '',
    expire: ''
  };

  // itemsCreate(grocery) {
  //   const item = {
  //     name: grocery.name,
  //     enter: grocery.enter,
  //     expire: grocery.expire
  //   };
  //   axios.post('https://red-react-dahee-default-rtdb.asia-southeast1.firebasedatabase.app/items.json', item).then((response) => {
  //     console.log('Done itemsCreate', response);
  //   }).catch((error) => {
  //     axiosError(error);
  //   });
  // }

  itemsRead() {
    axios.get('https://red-react-dahee-default-rtdb.asia-southeast1.firebasedatabase.app/items.json').then((response) => {
      console.log('Done itemsRead', response);
      const items = [];
      for (const key in response.data) {
        const item = response.data[key];
        item.key = key;
        items.push(item);
      }
      console.log(items)
      this.items = items;
    }).catch((error) => {
      axiosError(error);
    });
  }

  itemsDelete(grocery) {
    console.log(grocery)
    const url = 'https://red-react-dahee-default-rtdb.asia-southeast1.firebasedatabase.app/items/'+grocery.key+'.json'
    axios.delete(url).then((response) => {
      console.log('Done itemsDelete', response);
      this.itemsRead();
    }).catch((error) => {
      axiosError(error);
    });
  }

  itemsUpdate(grocery) {
    const url = 'https://red-react-dahee-default-rtdb.asia-southeast1.firebasedatabase.app/items/'+grocery.key+'.json'
    const itemUpdate = {
      name: grocery.name,
      enter: grocery.enter,
      expire: grocery.expire
    }
    axios.patch(url, itemUpdate).then((response) => {
      console.log('Done itemsDelete', response);
    }).catch((error) => {
      axiosError(error);
    });
  }
}

export const itemsStore = new ItemsStore();
