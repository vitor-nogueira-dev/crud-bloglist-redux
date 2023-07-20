import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import listReducer from './listReducer';
import { composeWithDevTools } from '@redux-devtools/extension';

const store = createStore(
    listReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;