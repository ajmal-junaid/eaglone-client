/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../../utils/constants';
import { Link } from 'react-router-dom';
import LoadingBar from '../../components/Common/Loading';


function PaymentSuccess() {
    const [success, setSuccess] = useState(false)
    const [failed, setFailed] = useState(false);

    const params = new URLSearchParams(window.location.search);
    const paymentIntentParam = params.get('payment_intent');
    const clientSecretParam = params.get('payment_intent_client_secret');
    const redirectStatusParam = params.get('redirect_status');
    useEffect(() => {
        approvedPayment()
    }, [])
    const approvedPayment = () => {
        axios({
            method: "post",
            url: `${baseUrl}confirm-payment`,
            data: {
                clientSecret: clientSecretParam,
                transactionId: paymentIntentParam,
                status: redirectStatusParam
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
            .then((res) => {
                console.log(res.data.message, "suceess");
                setSuccess(true)
            })
            .catch((res) => {
                console.log(res.response.data, "catch");
                setFailed(true)
            });
    }

    return (
        <div className='pt-16 pb-8'>
            {success ? <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full">
                    <div>
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                            <p className="h-6 w-6 text-green-600" aria-hidden="true" />
                        </div>
                        <div className="mt-3 text-center">
                            <h2 className="text-lg font-medium text-gray-900">Payment successful!</h2>
                            <p className="mt-2 text-sm text-gray-500">
                                Thank you for your payment. Your transaction has been completed and a receipt has been emailed to you.
                            </p>
                        </div>
                    </div>
                    <div className="mt-5 flex justify-center">
                        <Link
                            to='/'
                            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Continue to Dashboard
                        </Link>
                    </div>
                </div>
            </div> : <div>
                {failed ? <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full">
                        <div>
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                                <p className="h-6 w-6 text-red-600" aria-hidden="true" />
                            </div>
                            <div className="mt-3 text-center">
                                <h2 className="text-lg font-medium text-gray-900">Payment failed</h2>
                                <p className="mt-2 text-sm text-gray-500">
                                    We&apos;re sorry, but there was an error processing your payment. Please check your payment information and try again.
                                </p>
                            </div>
                        </div>
                        <div className="mt-5 flex justify-center">
                            <Link
                                to='/user/home'
                                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                Return to Home
                            </Link>
                        </div>
                    </div>
                </div> : <LoadingBar/>}
            </div>
            }
        </div>
    )
}

export default PaymentSuccess