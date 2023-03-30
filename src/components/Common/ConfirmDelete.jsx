import React from "react";
import { Transition } from "@headlessui/react";

function DeleteConfirmBox({ data, setIsOpen, handleDelete }) {
  return (
    <>
      <Transition show={data.active}>
        <div className="fixed inset-0 z-10 flex items-center justify-center">
          <Transition.Child
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="inset-0 bg-gray-900 opacity-75"></div>
          </Transition.Child>
          <Transition.Child
            enter="transition-transform duration-300"
            enterFrom="scale-50 opacity-0"
            enterTo="scale-100 opacity-100"
            leave="transition-transform duration-300"
            leaveFrom="scale-100 opacity-100"
            leaveTo="scale-50 opacity-0"
          >
            <div className="z-20 w-full max-w-sm p-6 mx-auto bg-white rounded-md shadow-md">
              <h2 className="mb-4 text-lg font-medium text-gray-900">
                Confirm Deletion
              </h2>
              <p className="mb-6 text-sm text-gray-500">
                Are you sure you want to delete {data.couponName}?
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2 font-medium text-white bg-gray-400 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-3 py-2 font-medium text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Transition>
    </>
  );
}

export default DeleteConfirmBox;
