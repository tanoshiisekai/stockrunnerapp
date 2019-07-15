import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import MainView from '../components/MainView'
import Summary from '../components/Summary'
import BuyStock from '../components/BuyStock'
import SellStock from '../components/SellStock'


export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'mainview',
    component: MainView
  },{
      path: '/summary/',
      name: 'summary',
      component: Summary
  },{
      path: '/buystock/',
      name: 'buystock',
      component: BuyStock
  },{
      path: '/sellstock/',
      name: 'sellstock',
      component: SellStock
  }]
});
