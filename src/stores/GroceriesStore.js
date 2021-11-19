import { configure, makeAutoObservable } from 'mobx';
import moment from 'moment';
import axios from 'axios';
import { axiosError } from './common.js';

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
    axios.post('https://red-react-dahee-default-rtdb.asia-southeast1.firebasedatabase.app/groceries.json', grocery).then((response) => {
      console.log('Done groceriesCreate', response);
      this.groceriesRead();
    }).catch((error) => {
      axiosError(error);
    });
  }

  groceriesRead() {
    axios.get('https://red-react-dahee-default-rtdb.asia-southeast1.firebasedatabase.app/groceries.json').then((response) => {
      console.log('Done groceriesRead', response);
      const groceries = [];
      for (const key in response.data) {
        const grocery = response.data[key];
        grocery.key = key;
        groceries.push(grocery);
      }
      console.log(groceries)
      this.groceries = groceries;
    }).catch((error) => {
      axiosError(error);
    });
  }

  groceriesDelete(key) {
    console.log(key)
    const url = 'https://red-react-dahee-default-rtdb.asia-southeast1.firebasedatabase.app/groceries/'+key+'.json'
    axios.delete(url).then((response) => {
      console.log('Done groceriesDelete', response);
      this.groceriesRead();
    }).catch((error) => {
      axiosError(error);
    });
  }

  groceriesUpdate(index, grocery) {
    this.groceries[index] = grocery;
    console.log('Done groceriesUpdate', this.groceries);
  }
}

export const groceriesStore = new GroceriesStore();
