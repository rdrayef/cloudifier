import React from "react";
import { useForm } from "react-hook-form";
import TextField from "./TextField";
import SelectField from "./SelectField";
import { yupResolver } from "@hookform/resolvers/yup";

function FormGeneric({ fields, onSubmit, initialValues = {}, schema }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data) => {
    reset();
    onSubmit(data);
  };

  return (
    <form>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        {fields.map((field, index) =>
          field.type === "select" ? (
            <SelectField key={index} {...field} register={register} />
          ) : (
            <TextField
              key={index}
              {...field}
              register={register}
              trigger={trigger}
              error={errors[field.label]}
            />
          )
        )}
      </div>
      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
}

export default FormGeneric;

{
  /* <form onSubmit={handleSubmit(onSubmitHandler)} className="max-w-sm mx-auto">
<div className="flex flex-col w-3/4">
  {fields.map((field, index) =>
    field.type === "select" ? (
      <SelectField key={index} {...field} register={register} />
    ) : (
      <TextField
        key={index}
        {...field}
        register={register}
        trigger={trigger}
        error={errors[field.label]}
      />
    )
  )}
  <button
    type="submit"
    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  >
    Submit
  </button>
</div>
</form> */
}
