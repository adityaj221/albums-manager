
const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      {
        path: '',
        alias: 'index.html',
        name: 'home',
        component: () => import('pages/Index.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('pages/Profile.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'albums/new',
        name: 'newAlbum',
        component: () => import('pages/AlbumCreate.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'album/:id',
        name: 'album',
        component: () => import('pages/Album.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'album/:id/edit',
        name: 'editAlbum',
        component: () => import('pages/AlbumEdit.vue'),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/auth',
    component: () => import('layouts/Auth.vue'),
    children: [{
      path: '',
      name: 'auth',
      component: () => import('pages/Auth.vue'),
      meta: {
        requiresAuth: false
      }
    }]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
