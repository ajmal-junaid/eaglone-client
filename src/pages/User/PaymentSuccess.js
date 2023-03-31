import React from 'react'


function PaymentSuccess() {
    const params = new URLSearchParams(window.location.search);
    const paymentIntentParam = params.get('payment_intent');
    const clientSecretParam = params.get('payment_intent_client_secret');
    const redirectStatusParam = params.get('redirect_status');
    console.log(paymentIntentParam,clientSecretParam,redirectStatusParam);
    return (
        <div className='pt-16 pb-8'>
            <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
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
                        <a
                            href="#"
                            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Continue to Dashboard
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentSuccess