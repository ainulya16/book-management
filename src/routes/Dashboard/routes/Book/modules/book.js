import { api, TOKEN } from '../../../../../utils'

// ------------------------------------
// Constants
// ------------------------------------
export const BOOK = 'BOOK'
export const BOOK_ADD_SUCCESS = 'BOOK_ADD_SUCCESS'
export const BOOK_UPDATE_SUCCESS = 'BOOK_UPDATE_SUCCESS'
export const BOOK_SUCCESS = 'BOOK_SUCCESS'
export const BOOK_FAILURE = 'BOOK_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------
export const get_book_list = () => {
  return {
    type    : BOOK,
    payload: {
      request: {
        url: api.books,
        params:{ token: localStorage.getItem(TOKEN)},
      },
      options: {
        onSuccess:({dispatch,response})=>{
          const { data } = response;
          dispatch({type:BOOK_SUCCESS,payload:data.data.books})
        },
      }
    }
  }
}

export const delete_book = (rowKeys) =>{
  return (dispatch, getState)=>{
    const { books } = getState().book
    let payload = books.filter(item=>rowKeys.indexOf(item.id)==-1)
    dispatch({type:BOOK_SUCCESS,payload})
  }
}
export const create_book = (data, callback) =>{
  return (dispatch)=>{
    return new Promise(resolve=>{
      dispatch({
        type    : BOOK,
        payload: {
          request: {
            url: api.books_insert,
            method:'post',
            data,
            params:{ token: localStorage.getItem(TOKEN)},
          },
          options: {
            onSuccess:({dispatch,response})=>{
              const { data } = response;
              dispatch({type:BOOK_ADD_SUCCESS,payload:data.data})
              resolve(data.data)
            },
          }
        }
      })
    })
  }
}
export const update_book = (data) =>{
  return (dispatch)=>{
    return new Promise(resolve=>{
      dispatch({
        type    : BOOK,
        payload: {
          request: {
            url: api.books_edit,
            method:'post',
            data,
            params:{ token: localStorage.getItem(TOKEN)},
          },
          options: {
            onSuccess:({dispatch,response})=>{
              const { data } = response;
              dispatch({type:BOOK_UPDATE_SUCCESS,payload:data.data})
              resolve(data.data)
            },
          }
        }
      })
    })
  }
}

export const actions = {
  get_book_list,
  delete_book,
  create_book,
  update_book,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [BOOK]                : (state, action) => Object.assign({}, state, { loading:true }),
  [BOOK_ADD_SUCCESS]    : (state, action) => Object.assign({}, state, { loading:false, books:[...state.books,action.payload] }),
  [BOOK_UPDATE_SUCCESS] : (state, action) => Object.assign({}, state, { loading:false, books:[...state.books.filter(item=>item.id!==action.payload.id),action.payload] }),
  [BOOK_SUCCESS]        : (state, action) => Object.assign({}, state, { loading:false, books:action.payload }),
  [BOOK_FAILURE]        : (state, action) => Object.assign({}, state, { loading:false }),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  loading:false,
  books:[]
}
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
