import classNames from 'classnames';
import type { ServerOffer } from '../../types/offer';
import { AppRoute } from '../../constants';
import { ULink } from '../u-link/u-link';

type CardProps = {
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
		setActiveCard?: (offerId: string | null) => void;
}


function Card({offer, setActiveCard}: CardProps): React.JSX.Element {
	const favorireLabel = `${offer.isFavorite ? 'In' : 'To'} bookmarks`;
	const favoriteClass = classNames(
		'place-card__bookmark-button',
		{'place-card__bookmark-button--active': offer.isFavorite},
		'button'
	);
	const offerHref = AppRoute.Offer.replace(':id', offer.id);

	function handleCardPointerEnter() {
		setActiveCard!(offer.id);
	}

	function handleCardPointerLeave() {
		setActiveCard!(null);
	}

	return (
		<article
			className="cities__card place-card"
			onPointerEnter={setActiveCard && handleCardPointerEnter}
			onPointerLeave={setActiveCard && handleCardPointerLeave}
		>
			{offer.isPremium && (
				<div className="place-card__mark">
					<span>Premium</span>
				</div>)}
			<div className="cities__image-wrapper place-card__image-wrapper">
				<ULink href={offerHref}>
					<img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image" />
				</ULink>
			</div>
			<div className="place-card__info">
				<div className="place-card__price-wrapper">
					<div className="place-card__price">
						<b className="place-card__price-value">&euro;{offer.price}</b>
						<span className="place-card__price-text">&#47;&nbsp;night</span>
					</div>
					<button className={favoriteClass} type="button">
						<svg className="place-card__bookmark-icon" width="18" height="19">
							<use xlinkHref="#icon-bookmark"></use>
						</svg>
						<span className="visually-hidden">{favorireLabel}</span>
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
				<p className="place-card__type">{offer.type}</p>
			</div>
		</article>
	);
}

export default Card;
