import MainPage from '../../pages/main-page/main-page';

type AppProps = {
	totalPlaces: number;
	favoriteCount: number;
};

function App({totalPlaces, favoriteCount} : AppProps) {
	return (
		<MainPage
			totalPlaces={totalPlaces}
			favoriteCount={favoriteCount}
		/>
	);
}

export default App;
