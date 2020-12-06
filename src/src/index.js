import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import App from './App';
import Home from './page/Home';
import reportWebVitals from './reportWebVitals';
/** Create redux */
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rooReducer from './redux/index';
const store = createStore(rooReducer);
// console.log(store.getState());
/** Create redux */

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Home />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
