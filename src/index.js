import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import { Provider } from 'react-redux';
import store from './store';
import './i18n';

ReactDOM.render(
  <>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
    <div id="fb-root"></div>
    <div id="fb-customer-chat" className="fb-customerchat"></div>
  </>,
  document.getElementById('root')
);

 var chatbox = document.getElementById('fb-customer-chat');
 chatbox.setAttribute('page_id', '115978264435268');
 chatbox.setAttribute('attribution', 'biz_inbox');
 window.fbAsyncInit = function () {
   window.FB.init({
     xfbml: true,
     version: 'v13.0',
   });
 };
 (function (d, s, id) {
   var js,
     fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) return;
   js = d.createElement(s);
   js.id = id;
   js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
   fjs.parentNode.insertBefore(js, fjs);
 })(document, 'script', 'facebook-jssdk');
