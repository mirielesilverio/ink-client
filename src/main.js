import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Login from './pages/Login.vue';
import Home from './pages/Home.vue';
import Agenda from './pages/Agenda.vue';
import Clients from './pages/Clients.vue';
import Budget from './pages/Budget.vue';
import VueFloatingAlert from 'vue-floating-alert'
 
Vue.use(VueFloatingAlert);
Vue.use(VueAxios, axios)
Vue.use(VueRouter);
  
Vue.prototype.$INK = {}

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login'},
    { path: '/login', component: Login, name: 'login'},
    { path: '/home', component: Home, name: 'home'},
    { path: '/agenda', component: Agenda, name: 'agenda'},
    { path: '/clients', component: Clients, name: 'clients'},
    { path: '/budget', component: Budget, name: 'budget'},
  ]
})


new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})