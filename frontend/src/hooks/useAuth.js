import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      "useAuth doit être utilisé à l'intérieur d'un AuthProvider"
    );
  }

  return context;
};

export default useAuth;
