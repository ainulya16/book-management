import { api, TOKEN } from '../../../utils'
import { browserHistory} from 'react-router'
// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const PROFILE = 'PROFILE'
export const PROFILE_SUCCESS = 'PROFILE_SUCCESS'
export const PROFILE_FAILURE = 'PROFILE_FAILURE'
export const LOGOUT = 'LOGOUT'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------
export const login = (data) =>{
  return {
    type    : LOGIN,
    payload: {
      request: {
        url: api.login,
        method: 'post', 
        data,
      },
      options: {
        onSuccess:({dispatch,response})=>{
          const { data } = response;
          localStorage.setItem(TOKEN,data.data.token)
          dispatch({type:LOGIN_SUCCESS,payload:data.data.token})
          browserHistory.replace("/book")
        },
      }
    }
  }
}
export const authenticate = (route='/book') => {
  return (dispatch, getState) => {
    let token = localStorage.getItem(TOKEN)
    if(!token){
      browserHistory.replace('/login')
    }else{
      dispatch({type:LOGIN_SUCCESS,payload:token})
      browserHistory.replace(route)
    }
  }
}
export const logout = () =>{
  let token = localStorage.getItem(TOKEN)
  return {
    type    : LOGOUT,
    payload: {
      request: {
        url: api.logout,
        params:{token}
      },
      options: {
        onSuccess:({dispatch,response})=>{
          localStorage.removeItem(TOKEN)
          dispatch({type:LOGOUT_SUCCESS})
          browserHistory.replace("/login")
        },
      }
    }
  }
}
export const actions = {
  login,
  authenticate,
  logout
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOGIN]             : (state, action) => Object.assign({}, state, { loading:true }),
  [LOGIN_SUCCESS]     : (state, action) => Object.assign({}, state, { loading:false, token:action.payload }),
  [LOGIN_FAILURE]     : (state, action) => initialState,
  [PROFILE]           : (state, action) => Object.assign({}, state, { loading:true }),
  [PROFILE_SUCCESS]   : (state, action) => Object.assign({}, state, { loading:false, user:action.payload }),
  [PROFILE_FAILURE]   : (state, action) => Object.assign({}, state, { loading:false }),
  [LOGOUT]            : (state, action) => Object.assign({}, state, { loading:true }),
  [LOGOUT_SUCCESS]    : (state, action) => initialState,
  [LOGOUT_FAILURE]    : (state, action) => state,
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  user:{},
  token:null,
  loading:false,
  redirectUrl:'/book'
}
export default function authReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
