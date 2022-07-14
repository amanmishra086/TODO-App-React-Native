import {combineReducers, applyMiddleware} from 'redux';
import {createStore} from 'redux';

import thunk from 'redux-thunk';

import useReducer from './reducers';

const rootReducer = combineReducers({
  useReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
//export const store = createStore(rootReducer);
