import { Link } from 'react-router-dom';
import Logo from '../logo/logo';
import { AppRoute } from '../../constants';
import { ULink } from '../u-link/u-link';

type HeaderPops = {
	favoriteAmount: number;
}

function Header({favoriteAmount}: HeaderPops) {
	return (
		<header className="header">
				<div className="container">
					<div className="header__wrapper">
						<div className="header__left">
							<Logo />
						</div>
						<nav className="header__nav">
							<ul className="header__nav-list">
								<li className="header__nav-item user">
									<ULink href={AppRoute.favorites} className="header__nav-link header__nav-link--profile">
										<div className="header__avatar-wrapper user__avatar-wrapper"></div>
										<span className="header__user-name user__name">Oliver.conner@gmail.com</span>
										<span className="header__favorite-count">{favoriteAmount}</span>
									</ULink>
								</li>
								<li className="header__nav-item">
									<ULink className="header__nav-link" href="#">
										<span className="header__signout">Sign out</span>
									</ULink>
								</li>
							</ul>
						</nav>
					</div>
				</div>
			</header>
	);
}

export default Header;
