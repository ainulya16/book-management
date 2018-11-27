import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path : 'book',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Component = require('./containers').default
      const reducer = require('./modules/auth').default

      injectReducer(store, { key: 'auth', reducer })

      /*  Return getComponent   */
      cb(null, Component)

    /* Webpack named bundle   */
    }, 'book')
  }
})
