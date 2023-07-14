import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import css from './page-404.module.css';

function Page404(): React.JSX.Element {
	return (
		<div className={`${css.container} error`}>
			<Helmet>
				<title>6 Cities. 404 - Page not found</title>
			</Helmet>
			<img className={css.image} src="img/404.svg" width="252" height="294" alt="Специалист озадачен." />
			<h1 className={css.title}>404</h1>
			<p className={css.description}>Sorry, the page you visited does not exist.</p>
			<Link to="/" className="button form__submit">Go to main</Link>
		</div>
	);
}

export default Page404;

