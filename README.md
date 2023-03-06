# Hyperswitch Unified Checkout Demo

The Hyperswitch demo app is a two-page website that showcases the capabilities of the Hyperswitch SDK for enabling a seamless e-commerce experience for customers. The website is designed to look like a typical e-commerce website with a homepage and a product page.

When customers click on checkout with Hyperswitch , they are taken to the product page, which displays Hyperswitch SDK and a grid of products. Checkout page is displayed with an image, name, price, and a "Buy Now" button. When a customer clicks on the "Buy Now" button, they are prompted to enter their payment information. The checkout process is handled by the Hyperswitch SDK, which securely collects and processes the customer's information.

### The Hyperswitch demo app showcases several features of the Hyperswitch SDK, including:

1. **Seamless checkout**: Customers can complete their purchases with the best payment experience, thanks to the Hyperswitch SDK's integration with multiple payment gateways.
 2. **Security**: The Hyperswitch SDK uses industry-standard encryption and security protocols to protect customer information.
3. **Customizability**: The SDK can be easily customized to match the branding and style of any e-commerce website.


# Overview

<img width="1412" alt="Screen Shot 2023-03-06 at 12 55 53 PM" src="https://user-images.githubusercontent.com/126236898/223044972-a8e16b76-f597-4181-8e48-796d3c533fb4.png">
<img width="1413" alt="Screen Shot 2023-03-06 at 12 56 28 PM" src="https://user-images.githubusercontent.com/126236898/223045060-20e79930-fc35-4a31-9a2f-7c03682cd012.png">


The demo app provides all in one example for integration with Hyperswitch on the web
|  Feature  | Description |
| ------------- | ------------- |
|  **Beautiful UI Component**  | Demo uses a unified checkout element called ```PaymentElement``` to fit in the checkout page, including many payments methods with real time validations of the customer information , formatting and autofill. |
| **Multiple payment methods**  | The app offers multiple payment methods along with **Card Payments ,Google Pay, Apple Pay, Paypal** with single integration of ```PaymentElement```.|
| **Redirects**  | A redirect-based payment is support through **Paypal, Afterpay, Klarna, Affirm, Giropay, SOFORT, iDEAL, EPS**.|
| **Country support**  | Picking a country from the dropdown will automatically filter payments supported for the selected country.|
| **Dynamic 3D Secure for Visa and Mastercard**| The app automatically handles the correct flow to complete card payments with **3D Secure**, whether it’s required by the card or encoded in one of your payment intent.|
|**Responsive design**| The checkout experience works on all screen sizes. **Note:** Apple Pay works on Safari if the Wallet is enabled.|

# Integration 

The source code for merchant frontend is inside the source folder. 
The core logic of the integration is mainly contained in three files :
  1. **App.js** - Creates a payment intent to get the ```client_secret``` from the merchant server which inturn will get it from the Hyperswitch server through hyper node.
      **Note**: refer the link to setup [merchant server](https://hyperswitch.io/docs/sdkMethods/nodeSdk).
  3. **Workspace.js** - Workspace for checkout section and SDK. Customization changes can be seen here.
  4. **SDK.js** - Loads the SDK with Paynow button which handles the confirm payment. 

### Hyperswitch Elements 

Hyperswitch supports below elements for quick payments. Make sure to change the Element in the workspace.js to checkout other elements.

```PaymentElement```, ```CardNumberElement```, ```CardCVCElement```, ```CardExpiryElement```


### Get started with Node
You’ll need the following:
  1. **Node.js** >=10.0.0
  2. **Modern browser** that supports ES6 (Chrome to see the Payment Request, and Safari to see Apple Pay).
  3. **Hyperswitch account** to accept payments ([sign up](https://hyperswitch.io/get-early-access) for free). 
 
Please refer the docs to [setup node](https://hyperswitch.io/docs/sdkMethods/nodeSdk) with merchant server. 
**Note:** Please make sure to update url for fetch api in App.js with your merchant server url.

## Running the App

#### Run ```npm install``` 

Install all the dependencies from package.json

#### Run ```npm run start```

Merchant app will be running on http://localhost:3000/ .


<img width="1412" alt="Screen Shot 2023-03-06 at 4 42 34 PM" src="https://user-images.githubusercontent.com/126236898/223094915-0e8ccdb9-61ec-4ed9-91b0-52ec5e9584da.png">


<img width="1413" alt="Screen Shot 2023-03-06 at 4 37 58 PM" src="https://user-images.githubusercontent.com/126236898/223093955-34e314af-72a2-4f41-9d3a-6e92606412b2.png">


Try out the [live demo](https://demo-hyperswitch.netlify.app) here!!




