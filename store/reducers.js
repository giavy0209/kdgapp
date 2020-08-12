import {
    CHANGE_ROUTER,
    CHANGE_SCREEN_WIDTH,
    CHANGE_SCREEN_HEIGHT,
    CHANGE_USER_DATA,
    CHANGE_LOGIN_STATUS,
    CHANGE_CURRENCY,
    CHANGE_LANGUAGE,
    CHANGE_DISPLAY,
    CHANGE_PIN
} from './actions'

const reducers = function (state = {}, action) {
    if(!Number(state.width) || !Number(state.height)){
      return {
        ...state,
        width: 1,
        height: 1
      }
    }
    if(action.type === CHANGE_ROUTER){
      return {
        ...state,
        ...action.payload,
      }
    }else if(action.type === CHANGE_SCREEN_WIDTH){
      return {
        ...state,
        ...action.payload,
      }
    }else if (action.type === CHANGE_SCREEN_HEIGHT) {
      return {
        ...state,
        ...action.payload,
      }
    }else if (action.type === CHANGE_USER_DATA) {
      return {
        ...state,
        ...action.payload,
      }
    }else if(action.type === CHANGE_LOGIN_STATUS){
      return{
        ...state,
        ...action.payload,
      }
    }else if(action.type === CHANGE_CURRENCY){
      return{
        ...state,
        ...action.payload,
      }
    }else if(action.type === CHANGE_LANGUAGE){
      return{
        ...state,
        ...action.payload,
      }
    }else if(action.type === CHANGE_DISPLAY){
      return{
        ...state,
        ...action.payload,
      }
    }else if(action.type === CHANGE_PIN){
      return{
        ...state,
        ...action.payload,
      }
    }
    return state
}

export default reducers