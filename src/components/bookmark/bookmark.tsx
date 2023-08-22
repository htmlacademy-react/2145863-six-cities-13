import { useState } from "react";
import { ServerFullOffer } from "../../types/offer";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getAuthorizationStatus } from "../../store/user/user.selectors";
import { useNavigate } from "react-router-dom";
import { AppRoute, AuthorizationStatus, FavoritesStatus } from "../../constants";
import { sendFavoriteStatusApiAction } from "../../store/api-actions";
import { offersActions } from "../../store/offers/offers.slice";
import clsx from "clsx";

type BookmarkProps = {
	offerId: ServerFullOffer['id'];
	isFavorite: boolean;
	block?: string;
};



function Bookmark({block='place-card', offerId, isFavorite}: BookmarkProps): React.JSX.Element {
	const [bookmarked, setBookmarked] = useState(isFavorite);
	const authorizationStatus = useAppSelector(getAuthorizationStatus);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const favoriteLabel = `${isFavorite ? 'In' : 'To'} bookmarks`;
	const favoriteClass = clsx(
		`${block}__bookmark-button`,
		bookmarked && `${block}__bookmark-button--active`,
		'button'
	);
	let svgSize = {width:'18', height:'19'};
	if (block === 'offer') {
		svgSize = {width:'31', height:'33'};
	}


	function handleBookmarkClick() {
		(async () => {
			if (authorizationStatus !== AuthorizationStatus.Auth) {
				navigate(AppRoute.Login);
			}
			setBookmarked((current) => !current);
			await dispatch(sendFavoriteStatusApiAction({
				offerId,
				status: bookmarked ? FavoritesStatus.Removed : FavoritesStatus.Added
			}));
			dispatch(offersActions.setIsFavorite({
				offerId,
				status: bookmarked ? FavoritesStatus.Removed : FavoritesStatus.Added
			}));
		})();
	}

	return (
		<button
			className={favoriteClass}
			type="button"
			onClick={handleBookmarkClick}
		>
			<svg className={`${block}__bookmark-icon`} width={svgSize.width} height={svgSize.height}>
				<use xlinkHref="#icon-bookmark"></use>
			</svg>
			<span className="visually-hidden">{favoriteLabel}</span>
		</button>
	);
}

export default Bookmark;
