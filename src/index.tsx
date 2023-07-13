import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';


import {TemporalData} from './constants';
import { offers, fullOffers, comments } from './mocks/offers';
console.log(offers);
console.log(fullOffers);
console.log(comments);

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<App totalPlaces={TemporalData.offerAmount as number} favoriteCount={TemporalData.favoriteCount as number} />
	</React.StrictMode>
);
