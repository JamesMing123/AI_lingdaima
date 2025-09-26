import { createRouter, createWebHistory } from 'vue-router';
import WorkspacePage from '../pages/WorkspacePage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'workspace',
      component: WorkspacePage
    }
  ]
});

export default router;
