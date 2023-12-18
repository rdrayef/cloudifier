import { useContext } from "react";
import ServerStatusContext from "../contexts/ServerStatusContext";

export const useServerStatus = () => {
  const context = useContext(ServerStatusContext);
  if (!context) {
    throw new Error(
      "useServerStatus must be used within a ServerStatusProvider"
    );
  }
  return context;
};
