import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { RoutePath } from 'app/providers/router/config/routeConfig';
import { useAppSelector } from 'store/hooksStore';

export const useAuth = (redirectPath = RoutePath.login) => {
	const isAuthenticated = useAppSelector(
		(state) => state.userReducer.isAuthenticated,
	);

	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated) {
			navigate(redirectPath, { replace: true });
		}
	}, [isAuthenticated, navigate, redirectPath]);

	return isAuthenticated;
};
