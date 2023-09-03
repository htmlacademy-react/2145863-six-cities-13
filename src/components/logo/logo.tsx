import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../constants';

function Logo() {
	return (

		<NavLink
			data-testid="link"
			className={({isActive}) =>
				isActive
					? 'header__logo-link header__logo-link--active'
					: 'header__logo-link'}
			to={AppRoute.Main}
		>
			<img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
		</NavLink>
	);
}

export default Logo;
