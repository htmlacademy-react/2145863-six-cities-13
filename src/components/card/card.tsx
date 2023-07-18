import classNames from 'classnames';
import type { ServerOffer } from "../../types/offer";
import { Link } from 'react-router-dom';

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
		onActiveCardPointerEnter: (offerId: string) => void;
		onActiveCardPointerLeave: () => void;
}

function Card({offer, onActiveCardPointerEnter, onActiveCardPointerLeave}: CardProps): React.JSX.Element {
	const favorireLabel = `${offer.isFavorite ? 'In' : 'To'} bookmarks`;
	const favoriteClass = classNames(
		'place-card__bookmark-button',
		{'place-card__bookmark-button--active': offer.isFavorite},
		'button'
	);

	return (
		<article
			className="cities__card place-card"
			onPointerEnter={()=>onActiveCardPointerEnter(offer.id)}
			onPointerLeave={()=>onActiveCardPointerLeave()}
		>
			{offer.isPremium && (
				<div className="place-card__mark">
					<span>Premium</span>
				</div>)
			}
			<div className="cities__image-wrapper place-card__image-wrapper">
				<Link to={`/offer/${offer.id}`}>
					<img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image" />
				</Link>
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
						<span style={{ width: `${Math.round(offer.rating)  * 20}%` }}></span>
						<span className="visually-hidden">Rating</span>
					</div>
				</div>
				<h2 className="place-card__name">
					<Link to={`/offer/${offer.id}`}>{offer.title}</Link>
				</h2>
				<p className="place-card__type">{offer.type}</p>
			</div>
		</article>
	);
}

export default Card;
