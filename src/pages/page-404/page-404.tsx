import css from './page-404.module.css';
import { AppRoute } from '../../constants';
import { useDocumentTitle } from '../../hooks';
import { ULink } from '../../components/u-link/u-link';
import Header from '../../components/header/header';

function Page404(): React.JSX.Element {
	useDocumentTitle('404 - Page not found');
	return (
		<>
			<Header />
			<div data-testid="notfound-page" className={`${css.container} error`}>
				<img className={css.image} src="img/404.svg" width="252" height="294" alt="Специалист озадачен." />
				<h1 className={css.title}>404</h1>
				<p className={css.description}>Sorry, the page you visited does not exist.</p>
				<ULink href={AppRoute.Main} className="button form__submit">Go to main</ULink>
			</div>
		</>
	);
}

export default Page404;

