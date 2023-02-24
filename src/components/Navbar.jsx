import './style.css';
import logo from "../assests/Framehyperswitch.svg"
import usaflag from "../assests/usaflag.png"
export default function Navbar() {
  return (
    <div className="Navbar">
        <div>
        <a className='img' href="/"><img src={logo} alt='' width="200" /></a>
        </div>
        <div className='MenuItems'>
            <a className='Menulink' href='https://hyperswitch.io/'>
                Product
            </a>
            <a className='Menulink' href='https://hyperswitch.io/docs'>
                Developer Hub
            </a>
        </div>
        <div className='GetEarlyAccess'>
            <a className='earlyAccess' href='https://hyperswitch.io/get-early-access'>
                Get Early Access
            </a>
        </div>
        <div className='select'>
            <img className="flag" src={usaflag} alt='' width="30px" />
            <select className='countrySelect'>
                <option>United States</option>
            </select>
        </div>
    </div>
    )
}
