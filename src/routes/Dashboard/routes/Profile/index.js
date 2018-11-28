import { injectReducer } from '../../../../store/reducers'
export default (store) => ({
  path : 'profile',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Component = require('./containers').default
      const reducer = require('./modules/profile').default
      injectReducer(store,{ key:'profile', reducer })
      cb(null, Component)

    /* Webpack named bundle   */
    }, 'profile')
  }
})
