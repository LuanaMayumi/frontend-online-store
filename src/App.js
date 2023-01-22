import React from 'react';
import './App.sass';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/carrinho" component={ ShoppingCart } />
        <Route
          exact
          path="/detalhesProduto/:id"
          render={ (props) => (<ProductDetails { ...props } />) }
        />
      </Switch>
    </div>
  );
}

export default App;
