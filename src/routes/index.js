// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/PageLayout/PageLayout'
import Dashboard from './Dashboard'
import Login from './Login'
import { actions } from './Login/modules/auth';

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute: { onEnter: (nextState, replace) => store.dispatch(actions.authenticate()) },
  childRoutes: [
    Login(store),
    Dashboard(store)
  ]
})

export default createRoutes
