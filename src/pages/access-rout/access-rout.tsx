import { AppRoute, AuthorizationStatus } from '../../constants';
import { Navigate, Outlet } from 'react-router-dom';


type AccessRoutProps = {
	status: AuthorizationStatus;
}

// eslint-disable-next-line react/display-name
const createAccessRout = (accessStatus: AuthorizationStatus, navigateRout: string) => ({status}: AccessRoutProps) => {
	if (status === accessStatus) {
		return <Outlet/>;
	}

	return <Navigate to={navigateRout} />;
};

export const PrivateRoute = createAccessRout(AuthorizationStatus.Auth, AppRoute.Login);
export const PublicRoute = createAccessRout(AuthorizationStatus.NoAuth, AppRoute.Root);

