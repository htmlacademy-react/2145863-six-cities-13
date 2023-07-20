import Logo from '../logo/logo';
import { AppRoute } from '../../constants';
import { ULink } from '../u-link/u-link';
import { useLocation } from 'react-router-dom';

type HeaderPops = {
	favoriteAmount: number;
	hideNavigation?: boolean;
	isAthorized?: boolean;
}

function Header({
	favoriteAmount,
	hideNavigation = false,
	isAthorized = false
} : HeaderPops) {

	const pathname = useLocation();
	console.log('pathname:', pathname);

	return (
		<header className="header">
				<div className="container">
					<div className="header__wrapper">
						<div className="header__left">
							<Logo />
						</div>
						{!hideNavigation && (
							<nav className="header__nav">
								{ isAthorized ? (
									<ul className="header__nav-list">
										<li className="header__nav-item user">
											<ULink href={AppRoute.favorites} className="header__nav-link header__nav-link--profile">
												<div className="header__avatar-wrapper user__avatar-wrapper"></div>
												<span className="header__user-name user__name">Oliver.conner@gmail.com</span>
												<span className="header__favorite-count">{favoriteAmount}</span>
											</ULink>
										</li>
										<li className="header__nav-item">
											<ULink className="header__nav-link" href={AppRoute.login}>
												<span className="header__signout">Sign out</span>
											</ULink>
										</li>
									</ul>
								) : (
									<nav className="header__nav">
										<ul className="header__nav-list">
											<li className="header__nav-item user">
												<ULink
													className="header__nav-link header__nav-link--profile"
													href={AppRoute.login}
												>
													<div className="header__avatar-wrapper user__avatar-wrapper"></div>
													<span className="header__login">Sign in</span>
												</ULink>
											</li>
										</ul>
									</nav>
								)}
							</nav>
						)}
					</div>
				</div>
			</header>
	);
}

export default Header;
