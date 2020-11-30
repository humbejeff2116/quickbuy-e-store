










import {createStore, combineReducers } from 'redux'
import {addToCart, removeFromCart , updateCart, sortCart } from './actionCreators'
import {cartReducer, sortReducer} from './reducers'
import colorData from '../data/colorData'





const logger = store => next=> action => { 
    let res;
    console.groupCollapsed('dipatching', action.type)
    console.log('prevstate' , store.getState())
    console.log('action', action)
    res = next(action)
    console.log('nextstate' , store.getState())
    console.groupEnd()
    return res;

}
const saver = store=> next=> action => {

    let res;
    res = next(action)
    localStorage['redux-store '] = JSON.stringify(store.getState())
    return res;

}
const storeFactory = (initialState=colorData) => {

    applyMiddleware(logger,saver) (createStore)(combineReducers({cartReducer,sortReducer}),
    (localStorage['redux-store']) ? JSON.parse(localStorage['redux-store']) :
    initialState

    )

}

export default storeFactory



// const store = createStore(combineReducers({colorsReducer,sortreducer}),
//                             (localStorage['redux-store']) ?
//                             JSON.parse(localStorage[redux-store]):
//                             {}
// )


// store.subscribe(()=> localStorage['redux-store' ] = JSON.stringify(store.getState()))