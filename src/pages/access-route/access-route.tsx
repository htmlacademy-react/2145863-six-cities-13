import { AppRoute, AuthorizationStatus } from '../../constants';
import { Navigate, Outlet } from 'react-router-dom';

type AccessRoutProps = {
	status: AuthorizationStatus;
}

// eslint-disable-next-line react/display-name
const createAccessRoute = (accessStatus: AuthorizationStatus[], navigateRout: string) => ({status}: AccessRoutProps) => {
	if (accessStatus.includes(status)) {
		return <Outlet/>;
	}

	return <Navigate to={navigateRout} />;
};

export const PrivateRoute = createAccessRoute([AuthorizationStatus.Auth, AuthorizationStatus.Unknown], AppRoute.Login);
export const PublicRoute = createAccessRoute([AuthorizationStatus.NoAuth, AuthorizationStatus.Unknown], AppRoute.Main);

