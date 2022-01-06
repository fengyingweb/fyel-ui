const _import = require('./_import_' + process.env.NODE_ENV)

const  routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: _import('pages/Home'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/about',
    name: 'about',
    component: _import('pages/About'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/button',
    name: 'button',
    component: _import('base/Button'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/icon',
    name: 'icon',
    component: _import('base/Icon'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/loading',
    name: 'loading',
    component: _import('feedback/Loading'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/navBar',
    name: 'navBar',
    component: _import('nav/NavBar'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/tabbar',
    name: 'tabbar',
    component: _import('nav/Tabbar'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/layout',
    name: 'layout',
    component: _import('base/Layout'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/popup',
    name: 'popup',
    component: _import('base/Popup'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/actionsheet',
    name: 'actionsheet',
    component: _import('feedback/Actionsheet'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/dialog',
    name: 'dialog',
    component: _import('feedback/Dialog'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/toast',
    name: 'toast',
    component: _import('feedback/Toast'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/notify',
    name: 'notify',
    component: _import('feedback/Notify'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/sidebar',
    name: 'sidebar',
    component: _import('nav/Sidebar'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/tab',
    name: 'tab',
    component: _import('nav/Tab'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/pagination',
    name: 'pagination',
    component: _import('nav/Pagination'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/treeSelect',
    name: 'treeSelect',
    component: _import('nav/TreeSelect'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/indexBar',
    name: 'indexBar',
    component: _import('nav/IndexBar'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/pullRefresh',
    name: 'pullRefresh',
    component: _import('feedback/PullRefresh'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/swipeCell',
    name: 'swipeCell',
    component: _import('feedback/SwipeCell'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/checkbox',
    name: 'checkbox',
    component: _import('form/Checkbox'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/field',
    name: 'field',
    component: _import('form/Field'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/numberKeyboard',
    name: 'numberKeyboard',
    component: _import('form/NumberKeyboard'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/passwordInput',
    name: 'passwordInput',
    component: _import('form/PasswordInput'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/radio',
    name: 'radio',
    component: _import('form/Radio'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/rate',
    name: 'rate',
    component: _import('form/Rate'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/search',
    name: 'search',
    component: _import('form/Search'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/slider',
    name: 'slider',
    component: _import('form/Slider'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/stepper',
    name: 'stepper',
    component: _import('form/Stepper'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/switch',
    name: 'switch',
    component: _import('form/Switch'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/switchCell',
    name: 'switchCell',
    component: _import('form/SwitchCell'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/uploader',
    name: 'uploader',
    component: _import('form/Uploader'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/picker',
    name: 'picker',
    component: _import('form/Picker'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/dateTimePicker',
    name: 'dateTimePicker',
    component: _import('form/DatetimePicker'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/circle',
    name: 'circle',
    component: _import('show/Circle'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/collapse',
    name: 'collapse',
    component: _import('show/Collapse'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/swipe',
    name: 'swipe',
    component: _import('show/Swipe'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/noticeBar',
    name: 'noticeBar',
    component: _import('show/NoticeBar'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/tag',
    name: 'tag',
    component: _import('show/Tag'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/steps',
    name: 'steps',
    component: _import('show/Steps'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/qrcode',
    name: 'qrcode',
    component: _import('show/QRcode'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/scroller',
    name: 'scroller',
    component: _import('show/Scroller'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/countDown',
    name: 'countDown',
    component: _import('show/CountDown'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/area',
    name: 'area',
    component: _import('service/Area'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/charts',
    name: 'charts',
    component: _import('chart/Chart'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/404',
    name: 'error',
    component: () => import('@/components/NotFound.vue')
  },
  {
    path: '*',
    redirect: {
      path: '/404'
    }
  }
]
export default routes
