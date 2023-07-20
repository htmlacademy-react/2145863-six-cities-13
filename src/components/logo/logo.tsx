import { AppRoute } from '../../constants';
import { ULink } from '../u-link/u-link';

function Logo() {
	return (
		<ULink href={AppRoute.root} className="header__logo-link header__logo-link--active">
			<img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
		</ULink>
	);
}

export default Logo;
