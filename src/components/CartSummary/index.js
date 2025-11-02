import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const cartLength = cartList.length
      const updatedList = cartList.map(
        product => product.price * product.quantity,
      )
      console.log(updatedList)
      const totalPrice = updatedList.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
      )

      return (
        <div className="cart-summary-container">
          <h1 className="order-total-value">
            <span className="order-total-label">Order Total:</span> Rs
            {totalPrice}/-
          </h1>
          <p className="total-items">{cartLength} Items in cart</p>
          <button type="button" className="checkout-button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
