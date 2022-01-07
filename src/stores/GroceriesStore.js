import { configure, makeAutoObservable } from 'mobx';
import _ from 'lodash';
import moment from 'moment';
import axios from 'axios';
import { axiosError } from './common.js';
import { loginStore } from './LoginStore.js';
import { itemsStore } from './ItemsStore.js';

configure({
  enforceActions: 'never',
  useProxies: 'never'
});

export default class GroceriesStore {
  constructor() {
    makeAutoObservable(this);
  }

  groceries = [];
  grocery = {
    name: '',
    enter: '',
    expire: ''
  };

  groceriesCreate() {
    const grocery = {
      name: this.grocery.name,
      enter: moment().format('YYYY-MM-DD'),
      expire: moment().add(7, 'days').format('YYYY-MM-DD')
    };
    axios.post(`https://red-react-dahee-default-rtdb.asia-southeast1.firebasedatabase.app/${loginStore.user.uid}/groceries.json`, grocery).then((response) => {
      console.log('Done groceriesCreate', response);
      this.groceriesRead();
    }).catch((error) => {
      axiosError(error);
    });
  }

  groceriesRead(orderByName, orderByType) {
    const promises = [];
    promises[0] = new Promise(function(resolve, reject) {
      axios.get(`https://red-react-dahee-default-rtdb.asia-southeast1.firebasedatabase.app/${loginStore.user.uid}/groceries.json`).then((response) => {
        console.log('Done groceriesRead', response);
        resolve(response.data);
      }).catch((error) => {
        reject(error);
      });
    })
    promises[1] = new Promise(function(resolve, reject) {
      axios.get(`https://red-react-dahee-default-rtdb.asia-southeast1.firebasedatabase.app/${loginStore.user.uid}/items.json`).then((response) => {
        let count = 0;
        for (const key in response.data) {
          const item = response.data[key];
          if (moment().add(3, 'days').format('YYYY-MM-DD') >= item.expire) count++;
        }
        itemsStore.count = count;
        resolve(response.data);
      }).catch(function(error) {
        reject(error);
      })
    })
    Promise.all(promises).then((result) => {
      console.log(result);
      const promiseGroceries = result[0];
      const promiseItems = result[1] || [];
      const groceries = [];
      for (const key in promiseGroceries) {
        const grocery = promiseGroceries[key];
        grocery.key = key;
        grocery.hasItem = promiseItems[key];
        groceries.push(grocery);
      }
      console.log(groceries);
      console.log(orderByName, orderByType);
      this.groceries = _.orderBy(groceries, orderByName, orderByType);
    }).catch(function(error) {
      axiosError(error);
    })

  }

  groceriesDelete(key) {
    console.log(key)
    const url = `https://red-react-dahee-default-rtdb.asia-southeast1.firebasedatabase.app/${loginStore.user.uid}/groceries/${key}.json`
    axios.delete(url).then((response) => {
      console.log('Done groceriesDelete', response);
      this.groceriesRead();
    }).catch((error) => {
      axiosError(error);
    });
  }

  groceriesUpdate(grocery) {
    const url = `https://red-react-dahee-default-rtdb.asia-southeast1.firebasedatabase.app/${loginStore.user.uid}/groceries/${grocery.key}.json`
    const groceryUpdate = {
      expire: grocery.expire
    }
    axios.patch(url, groceryUpdate).then((response) => {
      console.log('Done groceriesDelete', response);
      this.groceriesRead();
    }).catch((error) => {
      axiosError(error);
    });
  }
}

export const groceriesStore = new GroceriesStore();
