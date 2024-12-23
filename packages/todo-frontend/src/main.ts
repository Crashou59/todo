import './assets/main.css'
import 'vue3-toastify/dist/index.css';
import { createApp } from 'vue'
import App from './App.vue'
import Vue3Toastify, { toast, type ToastContainerOptions } from 'vue3-toastify';

const app = createApp(App)
app.use(Vue3Toastify, {
    autoClose: 3000,
    theme: "auto",
    type: "default",
  } as ToastContainerOptions);

app.config.errorHandler = (err, vm, info) => {
    toast(`Error ${err ?? vm ?? info}` )
  };
app.mount('#app')
