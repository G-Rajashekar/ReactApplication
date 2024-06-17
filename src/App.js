import {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = product => {
    const {cartList} = this.state
    const {id} = product
    const isProductExist = cartList.find(eachProduct => eachProduct.id === id)
    if (isProductExist===undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
  }

  deleteCartItem = id => {
    const {cartList} = this.state
    const updatedProducts = cartList.filter(eachProduct => {
      if (eachProduct.id !== id) {
        return eachProduct
      }
    })
    this.setState({cartList: updatedProducts})
  }

  incrementQuantity = id => {
    const {cartList} = this.state
    const updatedProducts = cartList.map(product => {
      const {quantity} = product
      if (product.id === id) {
        const updatedQuantity = quantity + 1
        return {...product, quantity: updatedQuantity}
      } else {
        return product
      }
    })
    this.setState({cartList: updatedProducts})
  }

  decrementQuantity = id => {
    const {cartList} = this.state
    const updatedProducts = cartList.map(product => {
      const {quantity} = product
      if (product.id === id && quantity > 1) {
        const updatedQuantity = quantity - 1
        return {...product, quantity: updatedQuantity}
      } else {
        return product
      }
    })
    this.setState({cartList: updatedProducts})
  }
  render() {
    const {cartList} = this.state

    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            deleteCartItem: this.deleteCartItem,
            incrementQuantity: this.incrementQuantity,
            decrementQuantity: this.decrementQuantity,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/products" component={Products} />
            <ProtectedRoute
              exact
              path="/products/:id"
              component={ProductItemDetails}
            />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
