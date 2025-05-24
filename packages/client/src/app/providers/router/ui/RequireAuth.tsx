import { Navigate, useLocation } from 'react-router-dom';
import { RoutePath } from '../config/routeConfig';
import { useAppSelector } from 'store/hooks';

export function RequireAuth({ children }: { children: JSX.Element }) {
    const isAuth = useAppSelector((state) => state.userReducer.isAuthenticated);
    console.log(isAuth, 'isAuth');

    const location = useLocation();

    if (!isAuth) {
        return (
            <Navigate to={RoutePath.main} state={{ from: location }} replace />
        );
    }

    return children;
}
