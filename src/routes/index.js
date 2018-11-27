// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/PageLayout/PageLayout'
import Dashboard from './Dashboard'
import Login from './Login'
const TOKEN = 'BOOK_APP_TOKEN'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */
const authenticate = (nextState, replace) =>{
  let token = window.sessionStorage.getItem(TOKEN)
  // replace('/dashboard')
  token ? replace('/dashboard') : replace('/login')
}
export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute: { onEnter: (nextState, replace) => authenticate(nextState, replace) },
  childRoutes: [
    Login(store),
    Dashboard(store)
  ]
})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
