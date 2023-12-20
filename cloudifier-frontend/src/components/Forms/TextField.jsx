import { useEffect } from "react";
import { Input } from "@material-tailwind/react";

function TextField({
  label,
  size = 15,
  type = "text",
  register,
  error,
  trigger,
}) {
  return (
    <div>
      <label
        htmlFor="first_name"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        First name
      </label>
      <input
        type="text"
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="John"
        required
      />
    </div>
  );
}

export default TextField;

{
  /* <div className="mb-5">
      {type != "hidden" && (
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark"
          htmlFor={label}
        >
          {label}
        </label>
      )}
      <input
        {...register(label)}
        onBlur={() => trigger(label)}
        type={type}
        size={size}
        className="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400"
      />
      {/* display error */
}
//   <p className="mt-2 text-sm text-red-600 dark:text-red-500">
//     {error?.message && <span class="font-medium">{error.message}</span>}
//   </p>
// </div> */}
