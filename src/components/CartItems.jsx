import './style.css';
import shirt from '../assests/shirt.png'
import cap from "../assests/cap.png"
export default function CartItems() {
  return (
  <div className="items">
    <div className='Item'>
        <div className='ItemContainer'>
            <div className='itemImg'>
                <img src={shirt}/>
            </div>
            <div className='itemDetails'>
                <div className='name'>HS Tshirt</div>
                <div className='props'>
                    Size: <span className='value'>37 &nbsp;&nbsp;&nbsp;</span>Qty:<span className='value'>1 </span>
                </div> 
                <div className='props'>Color: <span className='value'>Black</span></div>
            </div>
        </div>
        <div> 100.00</div>
    </div>
    <div className='Item'>
        <div className='ItemContainer'>
            <div className='itemImg'>
                <img src={cap}/>
            </div>
            <div className='itemDetails'>
                <div className='name'>HS Cap</div>
                <div className='props'>
                    Size: <span className='value'>2 &nbsp;&nbsp;&nbsp;</span>Qty:<span className='value'>1 </span>
                </div> 
                <div className='props'>Color: <span className='value'>Black</span></div>
            </div>
        </div>
        <div> 100.00</div>
    </div>
    <div className='ItemTotal'>
        <div className='total'>Total Amount</div>
        <div> 200.00</div>
    </div>
  </div>)
}