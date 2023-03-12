import React from "react";

const Table = () => {
  const headers = ["No", "Name", "Email", "Age"];
  const rows = [
    ["John Doe", "john@example.com", "30"],
    ["Jane Doe", "jane@example.com", "28"],
    ["Bob Smith", "bob@example.com", "35"],
  ];

  return (
    <div className="max-w-7xl sm:px-2 ">
      <div className="bg-white shadow-md rounded my-6 overflow-x-auto">
        <table className="min-w-max w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              {headers.map((header, index) => (
                <th key={index} className="py-3 px-6 text-left">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {rows.map((row, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {index + 1}
                </td>
                {row.map((data, index) => (
                  <td
                    key={index}
                    className="py-3 px-6 text-left whitespace-nowrap"
                  >
                    {data}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
