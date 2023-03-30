import axios from 'axios';
import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { baseUrl } from '../../../utils/constants';

function Payment() {
    const payNow = async(token)=>{
try {
    const response = await axios({
        url:`${baseUrl}payment`,
        method: 'post',
        data:{
            amount:78*100,
            token,
        },
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(
          localStorage.getItem("userToken")
        )}`,
        apikey:
          "getCourse $2b$14$Spul3qDosNUGfGA.AnYWl.W1DH4W4AnQsFrNVEKJi6.CsbgncfCUi",
      },
    })
    if(response.status==200){
        console.log("success",response);
    }
} catch (error) {
    console.log(error);
}
    }
  return (
    <div>
        <h1>Payment</h1>
        <StripeCheckout 
        stripeKey='pk_test_51MqJ81SGQtDohDQ3hjqu6uR41vjTCQrYsxVuqw83MhM2sceqseQJVrjrT7lVbMillInMnUCWVfMfQfWzn5OKzYDi00tcumukUp'
        label='Pay Now'
        name='Pay with Credit Card'
        billingAddress
        shippingAddress
        amount={78*100}
        description={`your total price is secret da`}
        token={payNow}
/>
    </div>
  )
}

export default Payment