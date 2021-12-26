import { configure, makeAutoObservable } from 'mobx';
import _ from 'lodash';
// import moment from 'moment';
import axios from 'axios';
import { axiosError } from './common.js';
import { loginStore } from './LoginStore.js';

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
    expire: '',
    key: ''
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

  itemsRead(q, orderByName, orderByType) {
    axios.get(`https://red-react-dahee-default-rtdb.asia-southeast1.firebasedatabase.app/${loginStore.user.uid}/items.json`).then((response) => {
      console.log('Done itemsRead', response);
      const items = [];
      for (const key in response.data) {
        const item = response.data[key];
        if (item.name.indexOf(q) === -1) {
          continue
        }
        item.key = key;
        items.push(item);
      }
      console.log(items)
      this.items = _.orderBy(items, orderByName, orderByType);
    }).catch((error) => {
      axiosError(error);
    });
  }

  itemsDelete(object, cb) {
    console.log(object)
    const confirm = window.confirm(object.name + '을 지우시겠습니까?')
    if (!confirm) {
      return
    }
    const url = `https://red-react-dahee-default-rtdb.asia-southeast1.firebasedatabase.app/${loginStore.user.uid}/items/${object.key}.json`
    axios.delete(url).then((response) => {
      console.log('Done itemsDelete', response);
      if (cb) cb();
    }).catch((error) => {
      axiosError(error);
    });
  }

  itemsUpdate(item, cb) {
    const url = `https://red-react-dahee-default-rtdb.asia-southeast1.firebasedatabase.app/${loginStore.user.uid}/items/${item.key}.json`
    const itemUpdate = {
      name: item.name,
      enter: item.enter,
      expire: item.expire
    }
    axios.patch(url, itemUpdate).then((response) => {
      console.log('Done itemsUpdate', response);
      if (cb) cb();
    }).catch((error) => {
      axiosError(error);
    });
  }
}

export const itemsStore = new ItemsStore();
