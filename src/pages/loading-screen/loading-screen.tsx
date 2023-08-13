import css from './loading-screen.module.css';

function LoadingScreen(): React.JSX.Element {
	return (
		<div>
			<div className={css.wrapper}>
				<img src="img/loader.svg" />
				<p className={css.text}>Loading...</p>
			</div>
		</div>
	);
}

export default LoadingScreen;
