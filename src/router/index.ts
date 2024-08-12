import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import LayoutView from '@/components/Layout/Layout.vue';
import DepartmentManagement from '@/components/Department/DepartmentManagement.vue';
import MainBoard from '@/components/MainBoard/MainBoard.vue';
import Login from '@/components/Login/Login.vue';
import EmployeeView from '@/views/EmployeeView.vue';
import UserView from '@/views/UserView.vue';
import RoleView from '@/views/RoleView.vue';
import PermissionView from '@/views/PermissionView.vue';
import { useStore } from 'vuex';
import FunctionManagement from '@/components/FunctionManagement/FunctionManagement.vue';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/',
    component: LayoutView,
    meta: { requiresAuth: true }, 
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
      {
        path: 'roles',
        name: 'RoleView',
        component: RoleView,
      },
      // {
      //   path: 'permissions',
      //   name: 'PermissionView',
      //   component: PermissionView,
      // },
      {
        path: 'functions',
        name: 'FunctionManagement',
        component: FunctionManagement,
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

router.beforeEach(async (to, from, next) => {
  const store = useStore(); 
  const isLoggedIn = store.state.authModule.isLoggedIn;

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;
