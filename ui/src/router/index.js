import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/view-cards',
    name: 'ViewCards',
    component: () =>
      import(/* webpackChunkName: "viewCards" */ '../views/ViewCards.vue')
  },
  {
    path: '/add-card',
    name: 'AddCard',
    component: () =>
      import(/* webpackChunkName: "AddCard" */ '../views/AddCard.vue')
  },
  {
    path: '/inspect-card/:id',
    name: 'InspectCard',
    component: () =>
      import(/* webpackChunkName: "InspectCard" */ '../views/InspectCard.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
