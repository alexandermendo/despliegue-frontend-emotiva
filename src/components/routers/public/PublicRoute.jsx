import { Navigate, Outlet } from "react-router";
import { useAuthContext } from "../../../contexts/AuthContext"
import { PRIVATE } from "../../../../../common/utils";

export const PublicRoute = () => {
  const { isAuthenticated } = useAuthContext();
  if (isAuthenticated) return <Navigate to={PRIVATE} />
  return (
    <div>
      <Outlet />
    </div>
  )
}