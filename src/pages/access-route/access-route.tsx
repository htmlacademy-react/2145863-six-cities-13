import { AppRoute, AuthorizationStatus } from '../../constants';
import { Navigate, Outlet } from 'react-router-dom';
import { store } from '../../store';


type AccessRoutProps = {
	status: AuthorizationStatus;
}

// eslint-disable-next-line react/display-name
const createAccessRoute = (accessStatus: AuthorizationStatus, navigateRout: string) => ({status}: AccessRoutProps) => {
	if (status === accessStatus) {
		return <Outlet/>;
	}

	return <Navigate to={navigateRout} />;
};

export const PrivateRoute = createAccessRoute(AuthorizationStatus.Auth, AppRoute.Login);
export const PublicRoute = createAccessRoute(AuthorizationStatus.NoAuth, AppRoute.Main);

