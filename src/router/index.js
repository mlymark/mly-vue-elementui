import Vue from 'vue'
import Router from 'vue-router'
import LoginView from '../views/LoginView'
import RegisterView from '../views/RegisterView'
import ForgetView from '../views/ForgetView'
import HomeView from '../views/HomeView'
import AdminView from '../views/AdminView'
import DashboardView from '../views/DashboardView'
import CompanyView from '../views/CompanyView'
import CompanyDetailView from '../views/CompanyDetailView'

Vue.use(Router)

export const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      children: [
        {
          path: '',
          redirect: '/admin/dashboard'
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: DashboardView,
          meta: {requiresAuth: true}
        },
        {
          path: 'company',
          name: 'company',
          component: CompanyView,
          meta: {requiresAuth: true}
        },
        {
          path: 'company/:id',
          name: 'companyDetail',
          component: CompanyDetailView,
          props: true,
          meta: {requiresAuth: true}
        }
      ]
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

router.beforeEach((to, from, next) => {
  console.log('beforeEach')
  if (to.meta.requiresAuth) {
    let token = localStorage.getItem('token')
    if (!token) {
      next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})
