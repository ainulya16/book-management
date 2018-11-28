export default (store) => ({
  path : 'profile',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Component = require('./containers').default
      cb(null, Component)

    /* Webpack named bundle   */
    }, 'profile')
  }
})
