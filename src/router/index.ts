import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import LayoutView from '@/components/Layout/Layout.vue';
import DepartmentManagement from '@/components/Department/DepartmentManagement.vue';
import MainBoard from '@/components/MainBoard/MainBoard.vue';
import Login from '@/components/Login/Login.vue';
import EmployeeView from '@/views/EmployeeView.vue';
import UserView from '@/views/UserView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/',
    component: LayoutView,
    meta: { requiresAuth: true }, // Thêm meta field cho xác thực
    children: [
      {
        path: '',
        name: 'Home',
        component: MainBoard,
      },
      {
        path: 'users',
        name: 'UserView',
        component: UserView,
      },
      {
        path: 'departments',
        name: 'DepartmentManagement',
        component: DepartmentManagement,
      },
      {
        path: 'employees',
        name: 'EmployeeManagement',
        component: EmployeeView,
      },
      // Thêm các route con khác nếu cần
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('isLoggedIn');
  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;
