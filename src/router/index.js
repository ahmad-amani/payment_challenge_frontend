import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/Auth.js'
import Main from '@/layout/Main.vue';
import Blank from '@/layout/Blank.vue';
import Dashboard from '@/layout/Dashboard.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => {
        router.push('register')
        return null
      },
      meta: {
        layout: Main
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
      meta: {
        layout: Main
      }
    },

    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue'),
      meta: {
        layout: Main
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue'),
      meta: {
        layout: Main,
        authRequired: true
      }
    },

    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/Setting.vue'),
      meta: {
        layout: Main,
        authRequired: true
      }
    },
    {
      path: '/packages',
      name: 'packages',
      component: () => import('../views/Packages.vue'),
      meta: {
        layout: Main,
        authRequired: true
      }
    },

    {
      path: '/transactions',
      name: 'transactions',
      component: () => import('../views/Transactions.vue'),
      meta: {
        layout: Main,
        authRequired: true
      }
    },
    {
      path: "/:pathMatch(.*)*",
      name: 'error',
      component: () => import('../views/Error.vue'),
      meta: {
        layout: Blank
      }
    }]
})

router.beforeEach(async (to) => {
  const auth = useAuthStore();
  if (to.meta.authRequired && !auth.user) {
    auth.returnUrl = to.fullPath;
    return '/register';
  }
  if ((to.name == 'login' || to.name == 'register') && auth.user) {
    return '/dashboard'
  }
});

export default router
