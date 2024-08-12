import { createStore, StoreOptions } from 'vuex';
import authModule from './modules/auth';
import departmentsModule from './modules/department';
import { RootState } from '@/models/Department';
import userModule from './modules/user';
import permissionModule from './modules/permission';
import rolesModule from './modules/role';

const store: StoreOptions<RootState> = {
  modules: {
    authModule,
    departmentsModule,
    userModule,
    permissionModule,
    rolesModule

  },
};

export default createStore(store);
