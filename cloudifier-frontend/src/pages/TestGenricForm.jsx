
import React from 'react';
import FormGeneric from '../components/Forms/FormGeneric';

const fields = [
    {
      label: "name",
      size: 15,
      type: "text",
    },
    {
      label: "age",
      size: 15,
      type: "number",
    },
  ];
const TestGenricForm = () => {
    return (
        <div>
            <FormGeneric fields={fields} />
        </div>
    );
}

export default TestGenricForm;
