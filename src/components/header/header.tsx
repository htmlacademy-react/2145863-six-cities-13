import Logo from '../logo/logo';
import { AppRoute, NameSpace } from '../../constants';
import { ULink } from '../u-link/u-link';
import { useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';
import { SyntheticEvent } from 'react';
import { store } from '../../store';

type HeaderPops = {
	hideNavigation?: boolean;
	isAuthorized?: boolean;
}

function handleSignOutClick(evt: SyntheticEvent){
	evt.preventDefault();
	store.dispatch(logoutAction());
}

function Header({
	hideNavigation = false,
	isAuthorized = false
} : HeaderPops) {

	const favoriteAmount = useAppSelector((state) => state[NameSpace.Offers].favoriteAmount);
	const userName = useAppSelector((state) => state[NameSpace.User].UserName);

	return (
		<header className="header">
			<div className="container">
				<div className="header__wrapper">
					<div className="header__left">
						<Logo />
					</div>
					{!hideNavigation && (
						<nav className="header__nav">
							{ isAuthorized ? (
								<ul className="header__nav-list">
									<li className="header__nav-item user">
										<ULink href={AppRoute.Favorites} className="header__nav-link header__nav-link--profile">
											<div className="header__avatar-wrapper user__avatar-wrapper"></div>
											<span className="header__user-name user__name">{userName}</span>
											<span className="header__favorite-count">{favoriteAmount}</span>
										</ULink>
									</li>
									<li className="header__nav-item">
										<ULink className="header__nav-link" href="" onClick={handleSignOutClick}>
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
												href={AppRoute.Login}
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
