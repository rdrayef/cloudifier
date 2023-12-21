import { useState } from "react";
import { toast } from "react-toastify";

export default function useToast() {
  const [position, setPosition] = useState("top-right");

  const showToast = (message, type = "info") => {
    toast[type](message, {
      position: position,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      // size
    });
  };
  const setToastPosition = (position) => {
    setPosition(position);
  };
  return { showToast, setToastPosition };
}
