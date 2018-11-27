import { injectReducer } from '../../store/reducers'
import Book from './routes/Book'

export default (store) => ({
  /*  Async getComponent is only invoked when route matches   */
  path: 'dashboard',

  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Login = require('./containers').default
      const reducer = require('./modules/auth').default

      injectReducer(store, { key: 'auth', reducer })

      /*  Return getComponent   */
      cb(null, Login)

    /* Webpack named bundle   */
    }, 'dashboard')
  },
  getChildRoutes(partialNextState, cb) {
    require.ensure([], function (require) {
      cb(null, [
        Book(store)
      ])
    })
  },
  
})

