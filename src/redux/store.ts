import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';

import listReducer from './listReducer';

const store = createStore(
    listReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;