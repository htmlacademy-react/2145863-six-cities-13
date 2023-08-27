import type { ServerOffer } from '../../types/offer';
import { AppRoute } from '../../constants';
import { ULink } from '../u-link/u-link';
import { useActionCreators } from '../../hooks';
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
	const {setActiveOffer} = useActionCreators(offersActions);
	const placeCardInfoClass = clsx('place-card__info', (block === 'favorites') && 'favorites__card-info');
	const imageWrapperClass = clsx(`${block}__image-wrapper`, 'place-card__image-wrapper');
	const offerHref = `${AppRoute.Offer}/${offer.id}`;

	let imageSize = {width: '260', height: '200'};
	if (block === 'favorites') {
		imageSize = {width: '150', height: '110'};
	}

	const notNearby = block !== 'near-places';

	function handleCardMouseEnter() {
		if (notNearby) {
			setActiveOffer(offer.id);
		}
	}

	function handleCardMouseLeave() {
		if (notNearby) {
			setActiveOffer(null);
		}
	}

	return (
		<article
			className={`${block}__card place-card`}
			onMouseEnter={handleCardMouseEnter}
			onMouseLeave={handleCardMouseLeave}
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
