import React from "react";
import { Button, Input, Label } from "@windmill/react-ui";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { baseUrl } from "../../../utils/constants";
import axios from "axios";
import sweetAlert from "../../Common/SweetAlert";
import { useNavigate } from "react-router-dom";

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
  percentage: Yup.number()
    .min(0, "Discount Percentage must be greater than or equal to 0")
    .max(100, "Discount Percentage must be lesser than or equal to 100")
    .required("Percentage is required"),
});
function AddCouponForm({handleClose}) {
  const navigate = useNavigate();
  const handleCouponApply = async (values) => {
    try {
      const response = await axios.post(
        `${baseUrl}admin/add-coupon`,
        {
          name: values.name,
          code: values.couponCode,
          expiryDate: values.expiry,
          minimumPurchase: values.minPurchase,
          maximumDiscount: values.maxDiscount,
          limit: values.limitForUser,
          percentage: values.percentage,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${JSON.parse(
              localStorage.getItem("adminToken")
            )}`,
            apikey:
              "bearer $2b$14$Spul3qDosNUGfGA.AnYWl.W1DH4W4AnQsFrNVEKJi6.CsbgncfCUi",
          },
        }
      );
      if (response) {
        sweetAlert("success", response.data.message);
        handleClose()
      }
    } catch (res) {
      console.log(res, "catch");
      if (res.response.status >= 401 && res.response.status <= 403) {
        localStorage.removeItem("adminToken");
        navigate("/admin");
      }
      sweetAlert("warning", res.response.data.message);
    }
  };
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
          percentage: "",
          maxDiscount: "",
          limitForUser: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleCouponApply(values);
          
            setSubmitting(false);
          
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
            <div className="w-full mx-2">
              <Field name="percentage">
                {({ field }) => (
                  <Label className="flex flex-col mb-4">
                    <span className="mb-2 font-bold text-gray-700">
                      Percentage
                    </span>
                    <Input
                      {...field}
                      className="px-3 py-2 border border-gray-300 rounded-md"
                      type="number"
                      placeholder="Enter discount percentage"
                      min="0"
                      max="100"
                      step="0.01"
                    />
                    <ErrorMessage
                      name="percentage"
                      component="div"
                      className="text-red-500"
                    />
                  </Label>
                )}
              </Field>
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
                        type="number"
                        placeholder="Enter max discount amount"
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
                        Coupon Limit
                      </span>
                      <Input
                        {...field}
                        className="px-3 py-2 border border-gray-300 rounded-md"
                        type="number"
                        placeholder="Enter Coupon limit "
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
