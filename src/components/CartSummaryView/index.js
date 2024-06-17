import CartContext from '../../context/CartContext'

const CartSummaryView = () => (
    <CartContext.Consumer>
    {value=>{
        const {cartList}=value 
        let total=0;
        for (let product of cartList){
            total+=(product.price)*(product.quantity)
        }
        const totalItems=cartList.length
        return(
            <div>
            <h1>Order Total: Rs{total}</h1>
            <p>{totalItems} items in cart</p>
            <button>Checkout</button>
            </div>
        )
    }

    }
    </CartContext.Consumer>
)
export default CartSummaryView
