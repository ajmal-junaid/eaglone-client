import React from "react";
import { Button, Input, Label } from "@windmill/react-ui";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  couponCode: Yup.string().trim().required("Coupon code is required"),
  name: Yup.string().trim().required("Name is required"),
  expiry: Yup.date().required("Expiry date is required"),
  minPurchase: Yup.number()
    .required("Minimum purchase is required")
    .min(0, "Minimum purchase amount must be at least 0"),
  maxDiscount: Yup.number()
    .min(0, "Max Discount amount must be greater than or equal to 0")
    .required("Max Discount amount is required"),
  limitForUser: Yup.number()
    .min(0, "Limit for a user must be greater than or equal to 0")
    .required("Limit for a user is required"),
});
function AddCouponForm() {
  return (
    <>
      <div className="flex justify-between items-center border-b-2 pb-2 mb-4">
        <div className="text-center w-full">
          <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wider mb-1">
            Add Coupon
          </h2>
        </div>
      </div>

      <Formik
        initialValues={{
          couponCode: "",
          name: "",
          expiry: "",
          minPurchase: "",
          maxDiscount: "",
          limitForUser: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="flex justify-evenly">
              <div className="w-full mx-2">
                <Field name="couponCode">
                  {({ field }) => (
                    <Label className="flex flex-col mb-4">
                      <span className="mb-2 font-bold text-gray-700">
                        Coupon Code
                      </span>
                      <Input
                        {...field}
                        className="px-3 py-2 border border-gray-300 rounded-md"
                        type="text"
                        placeholder="Enter coupon code"
                      />
                      <ErrorMessage
                        name="couponCode"
                        component="div"
                        className="text-red-500"
                      />
                    </Label>
                  )}
                </Field>
              </div>
              <div className="w-full mx-2">
                <Field name="name">
                  {({ field }) => (
                    <Label className="flex flex-col mb-4">
                      <span className="mb-2 font-bold text-gray-700">Name</span>
                      <Input
                        {...field}
                        className="px-3 py-2 border border-gray-300 rounded-md"
                        type="text"
                        placeholder="Enter coupon name"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500"
                      />
                    </Label>
                  )}
                </Field>
              </div>
            </div>
            <div className="flex justify-evenly">
              <div className="w-full mx-2">
                <Field name="expiry">
                  {({ field }) => (
                    <Label className="flex flex-col mb-4">
                      <span className="mb-2 font-bold text-gray-700">
                        Expiry
                      </span>
                      <Input
                        {...field}
                        className="px-3 py-2 border border-gray-300 rounded-md"
                        type="date"
                      />
                      <ErrorMessage
                        name="expiry"
                        component="div"
                        className="text-red-500"
                      />
                    </Label>
                  )}
                </Field>
              </div>
              <div className="w-full mx-2">
                <Field name="minPurchase">
                  {({ field }) => (
                    <Label className="flex flex-col mb-4">
                      <span className="mb-2 font-bold text-gray-700">
                        Minimum Purchase
                      </span>
                      <Input
                        {...field}
                        className="px-3 py-2 border border-gray-300 rounded-md"
                        type="number"
                        placeholder="Enter minimum purchase amount"
                        min="0"
                        step="0.01"
                      />
                      <ErrorMessage
                        name="minPurchase"
                        component="div"
                        className="text-red-500"
                      />
                    </Label>
                  )}
                </Field>
              </div>
            </div>

            <div className="flex justify-evenly">
              <div className="w-full mx-2">
                <Field
                  className="px-3 py-2 border border-gray-300 rounded-md"
                  name="maxDiscount"
                  placeholder="Enter max discount amount"
                  min="0"
                  step="0.01"
                >
                  {({ field }) => (
                    <Label className="flex flex-col mb-4">
                      <span className="mb-2 font-bold text-gray-700">
                        Max Discount
                      </span>
                      <Input
                        {...field}
                        className="px-3 py-2 border border-gray-300 rounded-md"
                        type="number" placeholder="Enter max discount amount"
                      />
                      <ErrorMessage
                        name="maxDiscount"
                        className="text-red-500"
                        component="div"
                      />
                    </Label>
                  )}
                </Field>
              </div>
              <div className="w-full mx-2">
                <Field name="limitForUser">
                  {({ field }) => (
                    <Label className="flex flex-col mb-4">
                      <span className="mb-2 font-bold text-gray-700">
                      Limit for a User
                      </span>
                      <Input
                        {...field}
                        className="px-3 py-2 border border-gray-300 rounded-md"
                        type="number"
                        placeholder="Enter limit for a user"
                        min="0"
                      />
                      <ErrorMessage
                        name="limitForUser"
                        component="div"
                        className="text-red-500"
                      />
                    </Label>
                  )}
                </Field>
              </div>
            </div>

            <div className="text-center">
              <Button
                type="submit"
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting" : "Submit"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default AddCouponForm;
