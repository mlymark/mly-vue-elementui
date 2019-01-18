import Vue from 'vue'
import Router from 'vue-router'
import LoginView from '../views/LoginView'
import RegisterView from '../views/RegisterView'
import ForgetView from '../views/ForgetView'
import HomeView from '../views/HomeView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/forget',
      name: 'forget',
      component: ForgetView
    }
  ]
})
