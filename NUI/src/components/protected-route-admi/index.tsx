import { Outlet, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userRole from "../../states/user-recoil";

const ProtectedRouteAdmi = () => {
  const isAdmin = useRecoilValue(userRole);

  return isAdmin ? <Outlet /> : <Navigate to='/' />
};

export default ProtectedRouteAdmi;