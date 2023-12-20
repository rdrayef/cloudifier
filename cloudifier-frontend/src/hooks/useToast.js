import { useState } from "react";
import { toast } from "react-toastify";

export default function useToast() {
  const [position, setPosition] = useState("top-right");

  const toastify = (type = "info", message) => {
    toast[type](message, {
      position: position,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };
  const setToastPosition = (position) => {
    setPosition(position);
  };
  return { setToastPosition };
}
