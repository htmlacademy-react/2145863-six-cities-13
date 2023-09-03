import Logo from '../logo/logo';
import { AppRoute, AuthorizationStatus } from '../../constants';
import { ULink } from '../u-link/u-link';
import { useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';
import { MouseEvent } from 'react';
import { store } from '../../store';
import { getAuthorizationStatus, getUser } from '../../store/user/user.selectors';
import { getFavoriteAmount } from '../../store/favorites/favorites.selectors';

type HeaderPops = {
	hideNavigation?: boolean;
}

function handleSignOutClick(event: MouseEvent<HTMLAnchorElement>){
	event.preventDefault();
	store.dispatch(logoutAction());
}

function Header({ hideNavigation = false,} : HeaderPops) {

	const user = useAppSelector(getUser);
	const favoriteAmount = useAppSelector(getFavoriteAmount);
	const isAuthorized = useAppSelector(getAuthorizationStatus) === AuthorizationStatus.Auth;

	return (
		<header data-testid="header" className="header">
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
											<div className="header__avatar-wrapper user__avatar-wrapper">
												{user && <img data-testid="avatar-id" src={user.avatarUrl} style={{borderRadius: '50%'}}/>}
											</div>
											<span className="header__user-name user__name">{user?.email}</span>
											<span data-testid="favorite-amount" className="header__favorite-count">{favoriteAmount}</span>
										</ULink>
									</li>
									<li className="header__nav-item">
										<ULink className="header__nav-link" href="" onClick={handleSignOutClick}>
											<span className="header__signout">Sign out</span>
										</ULink>
									</li>
								</ul>
							) : (
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
							)}
						</nav>
					)}
				</div>
			</div>
		</header>
	);
}

export default Header;
