import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'login',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Login = require('./containers').default
      const reducer = require('./modules/auth').default

      injectReducer(store, { key: 'auth', reducer })

      /*  Return getComponent   */
      cb(null, Login)

    /* Webpack named bundle   */
    }, 'login')
  }
})
