import { configure, makeAutoObservable } from 'mobx';
import moment from 'moment';

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
    this.groceries.push({
      name: this.grocery.name,
      enter: moment().format('YYYY-MM-DD'),
      expire: moment().add(7, 'days').format('YYYY-MM-DD')
    });
    console.log('Done groceriesCreate', this.groceries);
  }
}

export const groceriesStore = new GroceriesStore();
