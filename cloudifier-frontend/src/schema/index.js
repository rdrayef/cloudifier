import * as Yup from "yup";

export const schemaVm = Yup.object().shape({
  name: Yup.string().required("Required").min(3, "Too Short!"),
  // option: Yup.string().required("Required").min(3, "Too Short!"),
});
