import React from 'react'
import ReactDOM from 'react-dom';
import App from './App';
import { AppProvider ,AppContext} from './context';

ReactDOM.render(
 <AppProvider>
  <App/>
 </AppProvider>
 ,document.querySelector("#root"));
