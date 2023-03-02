import './style.css';
import success from '../assests/Successsuccess.svg'
import pending from '../assests/Pending.svg'
import failed from "../assests/broken-credit-card-debt-bankruptcy-failed-money-transaction-vector-stock-illustration-262717746.jpeg"
import React from 'react';
export default function Confirm({status}) {
    const [confirmText, setConfirmText] = React.useState("")
    const [confirmDes, setConfrimDes] = React.useState("")
    const [img, setImg] = React.useState()

    React.useEffect(()=>{
        if (status=="succeeded"){
            setImg(success)
            setConfirmText("Thanks for your order!")
            setConfrimDes("Yayyy! You successfully made a payment with Hyperswitch. If its a real store, your items would have been on their way.")
        } else if (status=="failed"){
            setImg(failed)
            setConfirmText("Payment Failed!")
            setConfrimDes("Oops! You failed to make a payment with Hyperswitch. If its a real store, order wouldn't have been placed")
        } else if (status=="processing"){
            setImg(pending)
            setConfirmText("Thanks for your order!")
            setConfrimDes("Your payment is processing with Hyperswitch. If its a real store, your order would soon on be on their way.")
        }
    },[status])
  return (
    <div className="ConfirmContainer">
            <div><img src={img} width="150px" height="110px"/></div>
            <div className='ConfirmText'>{confirmText}</div>
            <div className='ConfirmDes'>{confirmDes}</div>
            <div><a className='returnLink' href='/'>Try hyperswitch Demo again</a></div>
    </div>
  )
}