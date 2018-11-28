import { api, TOKEN } from '../../../../../utils'
import { browserHistory} from 'react-router'
// ------------------------------------
// Constants
// ------------------------------------
export const PROFILE = 'PROFILE'
export const PROFILE_SUCCESS = 'PROFILE_SUCCESS'
export const PROFILE_FAILURE = 'PROFILE_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------
export const get_user_profile = () =>{
  return {
    type    : PROFILE,
    payload: {
      request: {
        url: api.profile,
        params:{ token: localStorage.getItem(TOKEN)},
      },
      options: {
        onSuccess:({dispatch,response})=>{
          const { data } = response;
          dispatch({type:PROFILE_SUCCESS,payload:data.data})
        },
      }
    }
  }
}
export const actions = {
    get_user_profile
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [PROFILE]           : (state, action) => Object.assign({}, state, { loading:true }),
  [PROFILE_SUCCESS]   : (state, action) => Object.assign({}, state, { loading:false, user:action.payload }),
  [PROFILE_FAILURE]   : (state, action) => Object.assign({}, state, { loading:false }),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  user:{},
  loading:false,
}
export default function authReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
