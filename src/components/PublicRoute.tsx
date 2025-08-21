import { Navigate, Outlet } from "react-router-dom";

type PublicRouteProps = {
    isAuthenticated: boolean,
}

export function PublicRoute({ isAuthenticated }: PublicRouteProps) {
    return isAuthenticated ? <Navigate to={'/'} replace /> : <Outlet />;
}