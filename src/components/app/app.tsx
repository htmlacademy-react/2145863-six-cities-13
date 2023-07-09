import React from 'react';
import MainPage from '../../pages/main-page/main-page';

type AppProps = {
	totalPlaces: number;
	favoriteCount: number;
};

function App({totalPlaces, favoriteCount} : AppProps): React.JSX.Element {
	return (

		<MainPage
			totalPlaces={totalPlaces}
			favoriteCount={favoriteCount}
		/>
	);
}

export default App;
