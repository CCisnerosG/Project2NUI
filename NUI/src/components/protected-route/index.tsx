import { Outlet, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import loginState from "../../states/login-recoil";

const ProtectedRoute = () => {
  const isLoggedIn = useRecoilValue(loginState);

  return isLoggedIn ? <Outlet /> : <Navigate to='/Login' />
};

export default ProtectedRoute;