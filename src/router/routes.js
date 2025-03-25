const routes = [

  {
    path: '/login',
    component: () => import('pages/auth/LoginPage.vue')
  },

  {
    path: '/add',
    component: () => import('pages/AddPost.vue')
  },

  {
    path: '/register',
    component: () => import('pages/auth/RegisterPage.vue')
  },

  {
    path: '/profile/edit',
    component: () => import('pages/EditPage.vue')
  },

  {
    path: '/post/:id',
    component: () => import('pages/PostPage.vue')
  },

  {
    path: '/user/:id',
    component: () => import('pages/UserPage.vue')
  },

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },

      { path: '/status', component: () => import('pages/StatusPage.vue') },

      {
        path: '/friends',
        component: () => import('layouts/FriendLayout.vue'),

        children: [
          {
            path: '',
            component: () => import('pages/MyFriends.vue')
          },
          {
            path: 'ask',
            component: () => import('pages/askPage.vue')
          },
          {
            path: 'recommend',
            component: () => import('pages/FriendsPage.vue')
          },
          {
            path: 'request',
            component: () => import('pages/MyRequestPage.vue')
          },
        ]
      },

      {
        path: '/profile',
        component: () => import('pages/ProfilePage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
