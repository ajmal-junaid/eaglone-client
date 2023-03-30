import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import AddCouponForm from "./AddCouponForm";
import axios from "axios";
import { baseUrl } from "../../../utils/constants";
import sweetAlert from "../../Common/SweetAlert";
import ConfirmDelete from "../../Common/ConfirmDelete";

function Couponbody() {
  const [coupons, setCoupons] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({});
  const navigate = useNavigate();
  const headers = [
    "No",
    "Coupon",
    "Title",
    "Expiry date",
    "Percentage",
    "MaxDiscount",
    "MinPurchase",
    "Actions",
  ];
  const [modalIsOpen, setModalIsOpen] = useState(false);
  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }
  const getDatas = () => {
    axios({
      method: "get",
      url: `${baseUrl}admin/coupons`,
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(
          localStorage.getItem("adminToken")
        )}`,
        apikey:
          "getCourse $2b$14$Spul3qDosNUGfGA.AnYWl.W1DH4W4AnQsFrNVEKJi6.CsbgncfCUi",
      },
    })
      .then((res) => {
        setCoupons(res.data.data);
      })
      .catch((res) => {
        if (res.response.status >= 401 && res.response.status <= 403) {
          localStorage.removeItem("adminToken");
          navigate("/admin");
        }
        console.log(res.response.data, "catch");
        sweetAlert("warning", res.response.data.message);
      });
  };
  const deleteRequest = (couponId,name) => {
    setConfirmDialog({ active: true, couponId: couponId ,couponName:name});
  };
  const handleDelete = () => {
    console.log();
    axios({
      method: "delete",
      url: `${baseUrl}admin/delete-coupon/${confirmDialog.couponId}`,
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(
          localStorage.getItem("adminToken")
        )}`,
        apikey:
          "getCourse $2b$14$Spul3qDosNUGfGA.AnYWl.W1DH4W4AnQsFrNVEKJi6.CsbgncfCUi",
      },
    })
      .then((res) => {
        setConfirmDialog({ ...confirmDialog, active: false });
        sweetAlert("success", res.data.message);
      })
      .catch((res) => {
        if (res.response.status >= 401 && res.response.status <= 403) {
          localStorage.removeItem("adminToken");
          navigate("/admin");
        }
        console.log(res.response.data, "catch");
        sweetAlert("warning", res.response.data.message);
      });
  };
  const closeConfirm = () => {
    setConfirmDialog({ active: false });
  };

  useEffect(() => {
    getDatas();
  }, [handleDelete]);
  return (
    <>
      {confirmDialog.active && (
        <ConfirmDelete
        data={confirmDialog}
          isOpen={confirmDialog.active}
          setIsOpen={closeConfirm}
          handleDelete={handleDelete}
        />
      )}
      <div className="my-6 lg:my-12 container px-6 mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between pb-4 border-b border-gray-300">
        <div>
          <h4 className="text-2xl font-bold leading-tight text-gray-800">
            Coupon Management
          </h4>
        </div>
        <div className="mt-6 lg:mt-0">
          <button
            onClick={openModal}
            className="transition duration-150 ease-in-out hover:bg-indigo-600 focus:outline-none border bg-indigo-700 rounded text-white px-8 py-2 text-sm"
          >
            Add Coupon
          </button>
        </div>
      </div>
      <div className="container mx-auto px-6">
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={{
            content: {
              width: "100%",
              maxWidth: "900px",
              height: "auto",
              margin: "auto",
              position: "relative",
            },
          }}
        >
          <button
            onClick={closeModal}
            className="absolute top-0 right-0 m-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg
              className="h-6 w-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M11.414 10l4.293-4.293a1 1 0 1 0-1.414-1.414L10 8.586 5.707 4.293a1 1 0 1 0-1.414 1.414L8.586 10l-4.293 4.293a1 1 0 1 0 1.414 1.414L10 11.414l4.293 4.293a1 1 0 1 0 1.414-1.414L11.414 10z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <AddCouponForm handleClose={closeModal} />
        </Modal>
        <div className="w-full rounded">
          <div className="max-w-7xl sm:px-2 ">
            <div className="bg-white shadow-md rounded my-6 custom-height">
              <table className="min-w-max w-full table-auto ">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    {headers.map((header, index) => (
                      <th key={index} className="py-3 px-6 text-left">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light ">
                  {coupons &&
                    coupons.map((coupon, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200 hover:bg-gray-100"
                      >
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          {index + 1}
                        </td>
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          {coupon.code}
                        </td>
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          {coupon.name}
                        </td>
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          {coupon.expiryDate.slice(0, 10)}
                        </td>
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          {coupon.percentage}
                        </td>
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          {coupon.maximumDiscount}
                        </td>
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          {coupon.minimumPurchase}
                        </td>

                        <td className="px-6 py-4 md:py-6 md:px-8 text-sm md:text-base font-medium leading-5 text-gray-800 ">
                          <Link
                            onClick={() => deleteRequest(coupon._id,coupon.name)}
                            className="bg-red-300 hover:bg-red-500 text-black hover:text-white text-xs py-1 px-3 ml-4 rounded"
                          >
                            delete
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Couponbody;
