import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import searchReducer from './reducer';

const middleware = [ thunk ];
const store = createStore(
    searchReducer,
    compose(
        applyMiddleware(...middleware)
    )
);

export default store;