import type { ReactNode } from "react";
import { AppRoute, AuthorizationStatus } from "../../constants";
import { Navigate } from "react-router-dom";
import React from "react";


type AccessRoutProps = {
	children: ReactNode;
	status: AuthorizationStatus;
}

const createAccessRout = (accessStatus: AuthorizationStatus, navigateRout: string) =>
	({children, status}: AccessRoutProps): React.JSX.Element | ReactNode => {
		if (status === accessStatus) {
			return children;
		}

		return <Navigate to={navigateRout} />
	};

export const PrivateRoute = createAccessRout(AuthorizationStatus.Auth, AppRoute.login);
export const PublicRoute = createAccessRout(AuthorizationStatus.NoAuth, AppRoute.root);

