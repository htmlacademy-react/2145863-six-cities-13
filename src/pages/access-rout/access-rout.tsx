import type { ReactNode } from "react";
import { AppRoute, AuthorizationStatus } from "../../constants";
import { Navigate, Outlet } from "react-router-dom";
import React from "react";


type AccessRoutProps = {
	status: AuthorizationStatus;
}

const createAccessRout = (accessStatus: AuthorizationStatus, navigateRout: string) =>
	({status}: AccessRoutProps): React.JSX.Element | ReactNode => {
		if (status === accessStatus) {
			return <Outlet/>
		}

		return <Navigate to={navigateRout} />
	};

export const PrivateRoute = createAccessRout(AuthorizationStatus.Auth, AppRoute.login);
export const PublicRoute = createAccessRout(AuthorizationStatus.NoAuth, AppRoute.root);

