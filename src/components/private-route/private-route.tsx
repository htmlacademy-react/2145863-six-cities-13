import { Navigate } from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../constants';
import { Helmet } from 'react-helmet-async';

type PrivateRoutProps = {
	authorizationStatus: AuthorizationStatus;
	children: JSX.Element;
}

function PrivateRoute(props: PrivateRoutProps) {
	const {authorizationStatus, children} = props;

	return (
		authorizationStatus === AuthorizationStatus.Auth
			? children
			: <Navigate to={AppRoute.login} />
	);
}

export default PrivateRoute;
