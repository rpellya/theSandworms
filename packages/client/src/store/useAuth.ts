import { useNavigate } from 'react-router-dom';
import { useAppSelector } from './hooks';
import { useEffect } from 'react';
import { RoutePath } from 'app/providers/router/config/routeConfig';

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
