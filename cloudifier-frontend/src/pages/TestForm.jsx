import React from "react";
import FormGeneric from "../components/Forms/FormGeneric";
import TextField from "../components/Forms/TextField";

const fields = [
  {
    label: "Username",
    type: "text",
  },
  {
    label: "Password",
    type: "password",
  },
];

const TestForm = () => {
  return (
    <div className="h-screen">
      <FormGeneric fields={fields} />
    </div>
  );
};

export default TestForm;
