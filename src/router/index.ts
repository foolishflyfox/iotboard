import { createRouter, createWebHistory } from 'vue-router';
import MimicEditor from '@/views/mimic/MimicEditor.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/editor',
    },
    {
      path: '/editor',
      name: 'editor',
      component: MimicEditor,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/doc',
      name: 'doc',
      children: [
        {
          path: 'StrokeLinearGradientDoc',
          name: 'StrokeLinearGradientDoc',
          component: () => import('../views/docs/StrokeLinearGradientDoc.vue'),
        },
      ],
    },
  ],
});

export default router;
