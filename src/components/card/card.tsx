import type { ServerOffer } from '../../types/offer';
import { AppRoute } from '../../constants';
import { ULink } from '../u-link/u-link';
import { useAppDispatch } from '../../hooks';
import clsx from 'clsx';
import { offersActions } from '../../store/offers/offers.slice';
import React from 'react';
import { capitalize } from '../../utils/convert';
import Bookmark from '../bookmark/bookmark';

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
	const dispatch = useAppDispatch();
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

	const offerHref = `${AppRoute.Offer}/${offer.id}`;

	function handleCardPointerEnter() {
		dispatch(offersActions.setActiveOffer(offer.id));
	}

	function handleCardPointerLeave() {
		dispatch(offersActions.setActiveOffer(null));
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
					<Bookmark offerId={offer.id} isFavorite={offer.isFavorite}/>
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
