import { Navigate, Outlet } from "react-router";
import { useAuthContext } from "../../../contexts/AuthContext"
import { HOME } from "../../../../../common/utils";

export const PrivateRoute = () => {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) return <Navigate to={HOME} />

  return (
    <div>
      <Outlet />
    </div>
  )
}