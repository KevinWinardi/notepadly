import { Navigate, Outlet } from "react-router-dom";

type PrivateRouteProps = {
    isAuthenticated: boolean,
}

export function PrivateRoute({ isAuthenticated }: PrivateRouteProps) {
    return !isAuthenticated ? <Navigate to={'/login'} replace /> : <Outlet />;
}