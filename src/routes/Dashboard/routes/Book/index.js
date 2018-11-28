import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path : 'book',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Component = require('./containers').default
      const reducer = require('./modules/book').default
      cb(null, Component)
      injectReducer(store,{ key:'book', reducer })
    /* Webpack named bundle   */
    }, 'book')
  }
})
