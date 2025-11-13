import { Navigate, Outlet } from "react-router";

const PrivateRoute = ({ authStatus }) => {
  return authStatus === true ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoute;
