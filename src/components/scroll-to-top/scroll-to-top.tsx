import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

function ScrollToTop(): React.JSX.Element {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return <Outlet />;
}

export default ScrollToTop;
