import Login from '../pages/login'
var loginRouter = [{
  path: '/login',
  name: 'login',
  component: Login,
  meta: {
    hidden: true
  }
}, {
  path: '',
  redirect: 'login'
}]

export default loginRouter
