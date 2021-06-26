import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import authReducer from './store/reducers/auth';
import questionReducer from './store/reducers/questionpage'
import contestReducer from './store/reducers/contest'
import userReducer from './store/reducers/users'
import aboutReducer from './store/reducers/about'
import loadingReducer from './store/reducers/loading'
import starttestReducer from './store/reducers/Teststartloading'
//Redux Store
const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  question:questionReducer,
  contest:contestReducer,
  user:userReducer,
  about:aboutReducer,
  loading:loadingReducer,
  starttestloading:starttestReducer
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

//Render React and Redux

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();