import { useEffect } from "react";

function TextField({
  label,
  size = 15,
  type = "text",
  register,
  error,
  trigger,
}) {
  return (
    <div className="mb-5">
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
      {/* display error */}
      <p className="mt-2 text-sm text-red-600 dark:text-red-500">
        {error?.message && <span class="font-medium">{error.message}</span>}
      </p>
    </div>
  );
}

export default TextField;
