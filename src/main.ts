import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import DepartmentManagement from './components/Department/DepartmentManagement.vue';
import '@fortawesome/fontawesome-free/css/all.css';

console.log('API URL:', process.env.VUE_APP_API_URL);
createApp(App).use(store).use(store).use(router).component('DepartmentManagement', DepartmentManagement).mount("#app");
