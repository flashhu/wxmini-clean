export default defineAppConfig({
  pages: [
    'pages/order/index',
    'pages/user/index',
    'pages/his_addr/index',
    'pages/index/index',
    'pages/shop/index',
    'pages/shop_buy/index',
    'pages/launch/index',
    'pages/shop_sp/index',
    'pages/shop_cart/index',
    'pages/case/index',
    'pages/his_order/index',
    'pages/his_shopping/index',
  ],
  tabBar: {
    color: '#aaa',
    selectedColor: '#109dcd',
    backgroundColor: '#fafafa',
    borderStyle: 'white',
    list: [{
      iconPath: 'static/ico_intr.png',
      selectedIconPath: 'static/ico_intr_c.png',
      pagePath: 'pages/index/index',
      text: '简介'
    }, {
      iconPath: 'static/ico_exam.png',
      selectedIconPath: 'static/ico_exam_c.png',
      pagePath: 'pages/case/index',
      text: '案例'
    }, {
      iconPath: 'static/ico_orde.png',
      selectedIconPath: 'static/ico_orde_c.png',
      pagePath: 'pages/order/index',
      text: '预约'
    }, {
      iconPath: 'static/ico_shop.png',
      selectedIconPath: 'static/ico_shop_c.png',
      pagePath: 'pages/shop/index',
      text: '商城'
    }, {
      iconPath: 'static/ico_user.png',
      selectedIconPath: 'static/ico_user_c.png',
      pagePath: 'pages/user/index',
      text: '我的'
    }],
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '艾尔森净化',
    navigationBarTextStyle: 'black'
  }
})
