import './App.css';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Product from './Pages/Product/Product';
import Demo from './demo';
import Checkout from './Pages/Payment/Checkout';
import NavBar from './Components/NavBar/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './Components/Cart/Cart';
import { useEffect } from 'react';
import axios from 'axios';
import { actionsHome } from './store/homeSlice';
import AllProduct from './Pages/AllProduct/AllProduct';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';
import Admin from './Pages/Admin/Admin';

function App() {
  const openCart = useSelector((state) => state.cart.openCart);
  const isLogin = useSelector((state) => state.home.isLogin);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getApiProductHome() {
      const response = await axios.get(
        'https://backendfashionstore.azurewebsites.net/api/Products'
      );
      let data = [];
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].images.length > 0) {
          data.push(response.data[i]);
        } else {
          console.log(response.data[i].id);
        }
      }
      dispatch(actionsHome.getProduct(data));
    }

    getApiProductHome();
  }, [dispatch]);

  return (
    <>
      {openCart && <Cart />}
      {isLogin && <NavBar />}
      <Switch>
        <Route path="/login">
          {isLogin ? <Redirect to="/home" /> : <Login />}
        </Route>
        <Route path="/forgot-password">
          <ForgotPassword />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/home">
          {isLogin ? <Home /> : <Redirect to="/login" />}
        </Route>
        <Route path="/product/:productId">
          {isLogin ? <Product /> : <Login />}
        </Route>
        <Route path="/all-product">
          {isLogin ? <AllProduct /> : <Login />}
        </Route>
        <Route path="/user">{isLogin ? <Admin /> : <Login />}</Route>
        <Route path="/demo">
          <Demo />
        </Route>
        <Route path="/checkout">{isLogin ? <Checkout /> : <Login />}</Route>
        <Redirect exact from="/" to="/login" />
      </Switch>
    </>
  );
}

export default App;
