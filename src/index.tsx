import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { fullOffers } from './mocks';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<App fullOffers={fullOffers} />
	</React.StrictMode>
);
