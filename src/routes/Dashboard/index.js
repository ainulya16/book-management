import Book from './routes/Book'
import Profile from './routes/Profile'

export default (store) => ({
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Component = require('./containers').default
      cb(null, Component)

    /* Webpack named bundle   */
    }, 'dashboard')
  },
  getChildRoutes(partialNextState, cb) {
    require.ensure([], function (require) {
      cb(null, [
        Book(store),
        Profile(store),
      ])
    })
  },
  
})

