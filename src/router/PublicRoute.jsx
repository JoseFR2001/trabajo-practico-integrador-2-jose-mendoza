import { Navigate, Outlet } from "react-router";

const PublicRoute = ({ authStatus }) => {
  return authStatus === true ? <Navigate to="/home" /> : <Outlet />;
};
export default PublicRoute;
