import { combineReducers } from 'redux'
import locationReducer from './location'
import auth from '../routes/Login/modules/auth'
import book from '../routes/Dashboard/routes/Book/modules/book'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    auth,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
