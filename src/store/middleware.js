import axios from 'axios';
import { multiClientMiddleware } from 'redux-axios-middleware';
import thunk from 'redux-thunk'
import { environment } from '../utils';
import FormData from 'form-data';

const clients = {
    default: {
        client: axios.create({
        baseURL:environment.baseUrl,
        //  timeout: 30000,
        responseType: 'json'
        })
    },
}

const axiosMiddlewareOptions = {
  interceptors: {
    request: [(state, config) => {
      let newConfig = config
      if(config.method=='post'){
        newConfig.headers['Content-Type'] = 'multipart/form-data'
        if(config.data){
          let keys = Object.keys(config.data)
          let form_data = new FormData()
          keys.forEach(element => {
            form_data.append(element,config.data[element])
          });
          newConfig = { ...newConfig, data: form_data }
        }
      }
        // if (state.getState().loginReducer.token) config.headers['Authorization'] = 'Bearer '+state.getState().loginReducer.token
        return newConfig 
    }],
    // response: [{
    //   success: function (state, req) {
    //     return req
    //   },
    // }]
  },
  onError: ({ action, error, next, dispatch }) => {
    // if (error.response.status === 401) {
    //   return dispatch(AuthActions.logout());
    // }
    let nextAction = {
      error,
      meta: {
        previousAction: action,
      },
    };
    if (action.types && action.types.length === 3) {
      nextAction.type = action.types[2];
    } else {
      nextAction.type = action.type + '_FAILURE';
    }
    next(nextAction);
    let message = error.message ? error.message :'Cannot load data'
    return nextAction;
  }
}
  
  
const httpMiddleWare = multiClientMiddleware(clients,axiosMiddlewareOptions)
const middleware = [httpMiddleWare, thunk];
export default middleware