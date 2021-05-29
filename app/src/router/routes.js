
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/Heroes', component: () => import('pages/Heroes.vue') },
      { path: '/Comics', component: () => import('pages/Comics.vue') }
    ]
  },
  {
    path: '/Login',
    component: () => import('pages/Login.vue')
  },
  {
    path: '/Registration',
    component: () => import('pages/Registration.vue')
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
