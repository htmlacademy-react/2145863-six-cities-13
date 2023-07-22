import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { fullOffers, offers } from './mocks';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<App offers={offers} fullOffers={fullOffers} />
	</React.StrictMode>
);
