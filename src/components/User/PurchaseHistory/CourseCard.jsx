import React from "react";

function CourseCard(props) {
  console.log(props, "prooo");
  return (
    <div className="bg-gray-100 p-4">
      <ul className="bg-white rounded-lg shadow divide-y divide-gray-200">
        <li className="px-6 py-4 text-sm font-medium text-gray-900 uppercase tracking-wider">
          <div className="grid grid-cols-5 gap-3">
            <div>No</div>
            <div>Date</div>
            <div>Course count</div>
            <div>Total Amount</div>
            <div>Status</div>
          </div>
        </li>
        {props.orders.map((prop, index) => (
          <li key={index} className="px-6 py-4">
            <div className="grid grid-cols-5 gap-4">
              <div className="text-gray-900">{index + 1}</div>
              <div className="text-gray-900">{prop.createdAt.slice(0, 10)}</div>
              <div className="text-gray-900">{prop.courses.length}</div>
              <div className="text-gray-900">${prop.totalAmount}</div>
              {/* <div className="text-gray-900">
              {props.order.client == "succeeded" ? "true" : "false"}
            </div> */}
              <div
                className={`text-gray-900 ${
                  prop.client == "succeeded"
                    ? "text-green-500"
                    : "text-yellow-500"
                }`}
              >
                {prop.client}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseCard;
