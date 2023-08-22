import type { ServerOffer } from '../../types/offer';
import { AppRoute, AuthorizationStatus, FavoritesStatus } from '../../constants';
import { ULink } from '../u-link/u-link';
import { useAppDispatch, useAppSelector } from '../../hooks';
import clsx from 'clsx';
import { offersActions } from '../../store/offers/offers.slice';
import { useState } from 'react';
import { sendFavoriteStatusApiAction } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user/user.selectors';
import { useNavigate } from 'react-router-dom';
import { capitalize } from '../../utils/convert';

type CardProps = {
	block: string;
	offer: Pick<ServerOffer,
		'id' |
		'title' |
		'type' |
		'price' |
		'city' |
		'isFavorite' |
		'isPremium' |
		'rating' |
		'previewImage'
		>;
}

function Card({block, offer}: CardProps): React.JSX.Element {
	const [bookmarked, setBookmarked] = useState(offer.isFavorite);
	const dispatch = useAppDispatch();
	const favoriteLabel = `${offer.isFavorite ? 'In' : 'To'} bookmarks`;
	const authorizationStatus = useAppSelector(getAuthorizationStatus);
	const favoriteClass = clsx(
		'place-card__bookmark-button',
		bookmarked && 'place-card__bookmark-button--active',
		'button'
	);
	const placeCardInfoClass = clsx(
		'place-card__info',
		(block === 'favorites') && 'favorites__card-info',
	);

	const imageWrapperClass = clsx(
		`${block}__image-wrapper`,
		'place-card__image-wrapper'
	);

	let imageSize = {width: '260', height: '200'};
	if (block === 'favorites') {
		imageSize = {width: '150', height: '110'};
	}

	const navigate = useNavigate();

	const offerHref = `${AppRoute.Offer}/${offer.id}`;

	function handleCardPointerEnter() {
		dispatch(offersActions.setActiveOffer(offer.id));
	}

	function handleCardPointerLeave() {
		dispatch(offersActions.setActiveOffer(null));
	}

	function handleBookmarkClick() {
		(async () => {
			if (authorizationStatus !== AuthorizationStatus.Auth) {
				navigate(AppRoute.Login);
			}
			setBookmarked((current) => !current);
			await dispatch(sendFavoriteStatusApiAction({
				offerId: offer.id,
				status: bookmarked ? FavoritesStatus.Removed : FavoritesStatus.Added
			}));
			dispatch(offersActions.setIsFavorite({
				offerId: offer.id,
				status: bookmarked ? FavoritesStatus.Removed : FavoritesStatus.Added
			}));
		})();
	}

	return (
		<article
			className={`${block}__card place-card`}
			onMouseEnter={handleCardPointerEnter}
			onMouseLeave={handleCardPointerLeave}
		>
			{offer.isPremium && (
				<div className="place-card__mark">
					<span>Premium</span>
				</div>)}
			<div className={imageWrapperClass}>
				<ULink href={offerHref}>
					<img className="place-card__image" src={offer.previewImage} width={imageSize.width} height={imageSize.height} alt="Place image" />
				</ULink>
			</div>
			<div className={placeCardInfoClass}>
				<div className="place-card__price-wrapper">
					<div className="place-card__price">
						<b className="place-card__price-value">&euro;{offer.price}</b>
						<span className="place-card__price-text">&nbsp;&#47;&nbsp;night</span>
					</div>
					<button
						className={favoriteClass}
						type="button"
						onClick={handleBookmarkClick}
					>
						<svg className="place-card__bookmark-icon" width="18" height="19">
							<use xlinkHref="#icon-bookmark"></use>
						</svg>
						<span className="visually-hidden">{favoriteLabel}</span>
					</button>
				</div>
				<div className="place-card__rating rating">
					<div className="place-card__stars rating__stars">
						<span style={{ width: `${Math.round(offer.rating) * 20}%` }}></span>
						<span className="visually-hidden">Rating</span>
					</div>
				</div>
				<h2 className="place-card__name">
					<ULink href={offerHref}>{offer.title}</ULink>
				</h2>
				<p className="place-card__type">{capitalize(offer.type)}</p>
			</div>
		</article>
	);
}

export default Card;
