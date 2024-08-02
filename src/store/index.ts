import { createStore, StoreOptions } from 'vuex';
import authModule from './modules/auth';
import departmentsModule from './modules/department';
import { RootState } from '@/models/Department';

const store: StoreOptions<RootState> = {
  modules: {
    authModule,
    departmentsModule,
  },
};

export default createStore(store);
