import { useEffect } from "react";
import { useAuthContext } from "../../contexts/AuthContext"

export const EmotivaLogoutRouter = () => {
  const { logout } = useAuthContext();

  useEffect(
    function () {
      logout();
    },
    [logout]
  );
  
  return (
    <>
      <h1>Logout</h1>
    </>
  )
}