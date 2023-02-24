import './style.css';
export default function Footer() {
  return (
  <div className="Footer">
    <div className='Blogs'>
        <a className='Footerlink' href='https://blog.hyperswitch.io/'>
            Blogs
        </a>
        <a className='Footerlink' href='https://hyperswitch.io/terms-of-services'>
            Terms and Conditions
        </a>
        <a className='Footerlink' href='https://hyperswitch.io/privacyPolicy'>
           Privacy 
        </a>
    </div>
    <div className='Contact'>
        contact@hyperswitch.co
    </div>
  </div>)
}