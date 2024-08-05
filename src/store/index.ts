import { createStore, StoreOptions } from 'vuex';
import authModule from './modules/auth';
import departmentsModule from './modules/department';
import { RootState } from '@/models/Department';
import employeesModule from './modules/employee';
import userModule from './modules/user';
import permissionModule from './modules/permission';
import roleModule from './modules/role';

const store: StoreOptions<RootState> = {
  modules: {
    authModule,
    departmentsModule,
    employeesModule,
    userModule,
    permissionModule,
    roleModule

  },
};

export default createStore(store);
