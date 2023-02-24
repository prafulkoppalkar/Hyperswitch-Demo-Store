
import './App.css';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Workspace from './components/Workspace'
import React from "react"

function App() {
  const [clientSecret, setClientSecret] = React.useState("");
  React.useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("https://u4kkpaenwc.execute-api.ap-south-1.amazonaws.com/default/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        { 
          amount: 20000, 
          currency: "USD",
          metadata: {
            "order_details": {
                "product_name": "Apple iphone 15",
                "quantity": 1
            }
          },
          authentication_type: 'no_three_ds', 
          customer_id: "tester"
        }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("client",data.clientSecret)
        data.clientSecret ? setClientSecret(data.clientSecret) : setClientSecret("pay_aJYDi517PIOMgLW7owcl_secret_9IEA0CX7ksFSnlO4Dj8r")
      })
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Workspace clientSecret={clientSecret}/>
      <Footer />
    </div>
  );
}

export default App;
