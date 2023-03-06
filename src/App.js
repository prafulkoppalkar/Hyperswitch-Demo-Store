
import './App.css';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Workspace from './components/Workspace'
import React from "react"

function App() {
  const [clientSecret, setClientSecret] = React.useState("pay_aJYDi517PIOMgLW7owcl_secret_9IEA0CX7ksFSnlO4Dj8r");
  const [savedMethods, setSavedMethods] = React.useState([])
  const [country, setCountry] = React.useState("US")

  const countries = [
    {
      isoAlpha3: "USA",
      currency: "USD",
      countryName: "United States",
      isoAlpha2: "US",
    },
    {
      isoAlpha3: "CHE",
      currency: "CHF",
      countryName: "Switzerland",
      isoAlpha2: "CH",
    },
    {
      isoAlpha3: "DEU",
      currency: "EUR",
      countryName: "Germany",
      isoAlpha2: "DE",
    },
    {
      isoAlpha3: "NLD",
      currency: "EUR",
      countryName: "Netherlands",
      isoAlpha2: "NL",
    },
    {
      isoAlpha3: "AUS",
      currency: "AUD",
      countryName: "Australia",
      isoAlpha2: "AU",
    },
    {
      isoAlpha3: "AUT",
      currency: "EUR",
      countryName: "Austria",
      isoAlpha2: "AT",
    },
    {
      isoAlpha3: "GBR",
      currency: "GBP",
      countryName: "United Kingdom",
      isoAlpha2: "GB",
    },
    {
      isoAlpha3: "CAN",
      currency: "CAD",
      countryName: "Canada",
      isoAlpha2: "CA",
    },
  ]

  const getCurrency = () =>{
    const filter = countries.filter((item)=> item.isoAlpha2 == country)
    const curr = filter[0].currency
    return curr
  }
  React.useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("https://u4kkpaenwc.execute-api.ap-south-1.amazonaws.com/default/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        { 
          amount: 20000, 
          currency: getCurrency(),
          shipping:{
            address:{
              country:country,
              state: "test",
              zip: "571201",
              line1: "test line 1",
              city: "test city",
              first_name:"Bopanna MJ",
            },
            phone: {
              number:"+918105528922",
              counrty_code:country
            }
          },
          metadata: {
            "order_details": {
                "product_name": "Apple iphone 15",
                "quantity": 1
            }
          },
          billing: {
            address: {
              country: country,
            },
          },
          authentication_type: 'no_three_ds', 
          customer_id: "Bopanna12"
        }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Set clientSecret from the response 
        data.clientSecret ? setClientSecret(data.clientSecret) : setClientSecret("pay_aJYDi517PIOMgLW7owcl_secret_9IEA0CX7ksFSnlO4Dj8r")
      })
  }, [country]);

  React.useEffect(() => {
    // Get saved cards for a customer
    fetch("https://u4kkpaenwc.execute-api.ap-south-1.amazonaws.com/default/retrieve-customer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        { 
          customer_id: "Bopanna12"
        }),
    })
      .then((res) => res.json())
      .then((data) => {
        //Set customer saved cards from the response 
        data.customer_payment_methods ? setSavedMethods(data.customer_payment_methods) : setSavedMethods([])
      })
  }, []);


  return (
    <div className="App">
      <Navbar countries={countries} setCountry={setCountry}/>
      <Workspace clientSecret={clientSecret} savedMethods={savedMethods} />
      <Footer />
    </div>
  );
}

export default App;
