import { configure, makeAutoObservable } from 'mobx';

configure({
  // enforceActions: 'never',
  // useProxies: 'never'
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
      enter: this.grocery.enter,
      expire: this.grocery.expire
    });
    console.log('Done groceriesCreate', this.groceries);
  }
}

export const groceriesStore = new GroceriesStore();
