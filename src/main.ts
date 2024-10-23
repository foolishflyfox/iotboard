import './assets/global.css';
import 'virtual:uno.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

const app = createApp(App);

console.log('###1');
app.use(createPinia());
console.log('###2');
app.use(router);

app.mount('#app');
