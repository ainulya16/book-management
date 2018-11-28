export default (store) => ({
  path : 'book',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Component = require('./containers').default
      cb(null, Component)

    /* Webpack named bundle   */
    }, 'book')
  }
})
