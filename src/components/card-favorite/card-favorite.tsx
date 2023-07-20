import React from "react";
import type { ServerOffer } from "../../types/offer";
import { Link } from "react-router-dom";
import { AppRoute } from "../../constants";
import { ULink } from "../u-link/u-link";

type CardFavotireProps = {
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

function CardFavorite({offer}: CardFavotireProps): React.JSX.Element   {
	return (
		<article className="favorites__card place-card">
			{
				offer.isPremium &&
				<div className="place-card__mark">
					<span>Premium</span>
				</div>
			}
			<div className="favorites__image-wrapper place-card__image-wrapper">
				<ULink href={AppRoute.offer.replace(':id', offer.id)}>
					<img
						className="place-card__image"
						src={offer.previewImage}
						width={150}
						height={110}
						alt="Place image"
					/>
				</ULink>
			</div>
			<div className="favorites__card-info place-card__info">
				<div className="place-card__price-wrapper">
					<div className="place-card__price">
						<b className="place-card__price-value">€{offer.price}</b>
						<span className="place-card__price-text">
							/&nbsp;night
						</span>
					</div>
					<button
						className="place-card__bookmark-button place-card__bookmark-button--active button"
						type="button"
					>
						<svg
							className="place-card__bookmark-icon"
							width={18}
							height={19}
						>
							<use xlinkHref="#icon-bookmark" />
						</svg>
						<span className="visually-hidden">In bookmarks</span>
					</button>
				</div>
				<div className="place-card__rating rating">
					<div className="place-card__stars rating__stars">
						<span style={{ width: `${offer.rating * 20}%` }} />
						<span className="visually-hidden">Rating</span>
					</div>
				</div>
				<h2 className="place-card__name">
				<ULink href={AppRoute.offer.replace(':id', offer.id)}>{offer.title} </ULink>
				</h2>
				<p className="place-card__type">{offer.type}</p>
			</div>
		</article>
	);
}

export default CardFavorite;
