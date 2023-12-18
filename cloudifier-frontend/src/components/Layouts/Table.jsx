import React from 'react'
// columns: ["ID", "Name", "Status", "Actions"]
// rows: [{id: 1, name: "Machine1", status: "Online"}]
function Table({rows, columns}) {
  return (
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="p-4">
          <div className="flex items-center">
            <input
              id="checkbox-all-search"
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="checkbox-all-search" className="sr-only">
              checkbox
            </label>
          </div>
        </th>
        {
          columns.map((column, index) => (
            <th key={index} scope="col" className="px-6 py-4 font-medium">
              {column}
            </th>
          ))
        }
      
      </tr>
    </thead>
    <tbody>
       {
          rows.map((row, index) => (
            <tr key={index} className="border-t border-gray-200 dark:border-gray-700">
              <td className="p-4">
                <div className="flex items-center">
                  <input
                    id={`checkbox-${index}`}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor={`checkbox-${index}`} className="sr-only">
                    checkbox
                  </label>
                </div>
              </td>
              {
                columns.map((column, index) => (
                  <td key={index} className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10">
                      </div>
                      <div className="ml-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {Object.values(row)[index]}
                        </div>
                      </div>
                    </div>
                  </td>
                ))
              }
            
            </tr>
          ))
       }
      
      
    </tbody>
  </table>
</div>


  )
}

export default Table