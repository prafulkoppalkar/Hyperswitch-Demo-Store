import './style.css';
import './CartItems'
import CartItems from './CartItems';
import { useNavigate } from 'react-router-dom';
export default function Cart({setOpenSDK}) {
  var ele = document.getElementsByClassName('select')
  const navigate = useNavigate();
  return (
  <div className="Cart">
    <div className='orderSummary'>Order summary (2)</div>
      <CartItems/>
    <div className='checkoutSection'>
        <div className='description'>
            <span> Hyperswitch is a high performance payment switch which can smartly route the payment transaction to increase your revenue and reduce costs.</span>
            <span className='subtext'>
            Get started with <a className="here" href='https://hyperswitch.io/docs/quickstart'>hyperswitch</a>
            </span>
        </div>
        
        <div className='buttonSection'>
            <button className='CheckoutButton' onClick={()=>{
              // document.getElementById("uniqueSelect").style.display = "none"
              // document.getElementById("earlyAccess").style.display = "flex"
              // document.getElementById("earlyAccess").style.justifyContent = "end"
              navigate("/checkout")
              setOpenSDK(true)
            }}>Checkout with Hyperswitch</button>
        </div>
    </div>
  </div>
  )
}
