import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

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

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filterCartList = cartList.filter(product => product.id !== id)

    this.setState({cartList: filterCartList})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updateCartList = cartList.map(eachProduct => {
      if (eachProduct.id === id) {
        return {...eachProduct, quantity: eachProduct.quantity + 1}
      }

      return eachProduct
    })

    this.setState({cartList: updateCartList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updateCartList = cartList.map(eachProduct => {
      if (eachProduct.id === id) {
        if (eachProduct.quantity === 1) {
          console.log(true)
          this.removeCartItem(eachProduct.id)
        } else {
          return {...eachProduct, quantity: eachProduct.quantity - 1}
        }
      }

      return eachProduct
    })

    this.setState({cartList: updateCartList})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const isAvailable = cartList.find(item => item.id === product.id)

    if (isAvailable === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      this.incrementCartItemQuantity(product.id)
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
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
    )
  }
}

export default App
